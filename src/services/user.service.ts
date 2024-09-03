import {IUser} from "../models/IUser";
import {User} from "../models/User.model";

class UserService {
    public async findAll(): Promise<IUser[]> {
        return User.find()
    }

    public async findById(id: string): Promise<IUser> {
        return User.findById(id)
    }

    public async createUser(data: IUser): Promise<IUser> {
        return User.create({...data}) as unknown as IUser;
    }

    public async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(
            {_id: id},
            {...data},
            {returnDocument: "after"}
        )
    }

    public async deleteUser(id: string): Promise<IUser> {
        return User.findByIdAndDelete(
            {_id: id},
            {returnDocument: "after"}
        )
    }
}

export const userService = new UserService();