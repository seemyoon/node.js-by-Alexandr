import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";


class UserRepository {
    public async getListUsers(): Promise<IUser[]> {
        return await User.find()
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await User.create({...dto})
    }

    public async getUserById(userId: string): Promise<IUser | null> {
        return await User.findById(userId)
    }

    public async updateUserById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, {new: true})
    }

    public async deleteUserById(userId: string): Promise<void> {
        await User.deleteOne({_id: userId})
    }
}


export const userRepository = new UserRepository()