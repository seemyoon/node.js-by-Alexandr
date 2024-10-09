import {IUser, IUserListQuery} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {Token} from "../models/token.model";
import {FilterQuery, SortOrder} from "mongoose";
import {UserListOrderByEnum} from "../enums/user-list-order-by.enum";
import {OrderEnum} from "../enums/order.enum";
import {ApiError} from "../errors/customApiError";

class UserRepository {
    public async getListUsers(query: IUserListQuery): Promise<[IUser[], number]> {
        const filterObj: FilterQuery<IUser> = {}
        if (query.search) filterObj.name = {$regex: query.search, $options: "i"}

        const sortObj: { [key: string]: SortOrder } = {}
        if (query.order && query.orderBy) {
            switch (query.orderBy) {
                case UserListOrderByEnum.AGE:
                    sortObj[UserListOrderByEnum.AGE] = query.order === OrderEnum.DESC ? -1 : 1;
                    break;
                case UserListOrderByEnum.NAME:
                    sortObj[UserListOrderByEnum.NAME] = query.order === OrderEnum.DESC ? -1 : 1;
                    break;
                default:
                    throw new ApiError("Invalid sorted type", 500)
            }
        }

        const skip = query.limit * (query.page - 1)
        return await Promise.all([User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
            User.countDocuments(filterObj)
        ])
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await User.create({...dto})
    }

    public async getById(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select("+password")
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({email}).select("+password")
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, {new: true})
    }

    public async deleteById(userId: string): Promise<void> {
        await User.deleteOne({_id: userId})
    }

    public async findWithOutActivity(date: Date): Promise<IUser[]> {
        return await User.aggregate([
            {
                $lookup: {
                    from: Token.collection.name,
                    let: {userId: "$_id"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_userId", "$$userId"]}}},
                        {$match: {createdAt: {$gt: date}}}
                    ],
                    as: "tokens"
                }
            },
            {
                $match: {tokens: {$size: 0}}
            }
        ])
    }
}


export const userRepository = new UserRepository()