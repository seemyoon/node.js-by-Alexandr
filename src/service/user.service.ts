import {IUser} from "../interfaces/user.interface";
import {userRepository} from "../repository/user.repository";
import {ApiError} from "../errors/customApiError";

class UserService {
    public async getListUsers(): Promise<IUser[]> {
        return await userRepository.getListUsers()
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await userRepository.create(dto)
    }

    public async getUserById(userId: string): Promise<IUser> {
        const user = await userRepository.getUserById(userId)
        if (!user) throw new ApiError("User not found", 404)
        return user
    }

    public async updateUserById(id: string, dto: Partial<IUser>): Promise<IUser> {
        return await userRepository.updateUserById(id, dto)
    }

    public async deleteUserById(userId: string): Promise<void> {
       return await userRepository.deleteUserById(userId)
    }

}

export const userService = new UserService();