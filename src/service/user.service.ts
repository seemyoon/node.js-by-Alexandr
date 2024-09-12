import {IUser} from "../interfaces/user.interface";
import {userRepository} from "../repository/user.repository";
import {UserValidators} from "../validators/user.validator";
import {ApiError} from "../errors/customApiError";

class UserService {
    public async getListUsers(): Promise<IUser[]> {
        return await userRepository.getListUsers()
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        const {error} = UserValidators.createUser.validate(dto)
        if (error) throw new ApiError("Invalid fields", 400)
        return await userRepository.create(dto)
    }

    public async getUserById(userId: number): Promise<IUser> {
        const user = await userRepository.getUserById(userId)
        if (!user) throw new ApiError("User not found", 404)
        return user
    }

    public async updateUserById(id: number, dto: Partial<IUser>): Promise<void> {
        const {error} = UserValidators.createUser.validate(dto)
        if (error) throw new ApiError("Invalid fields", 400)
        return await userRepository.updateUserById(id, dto)
    }

    public async deleteUserById(userId: number): Promise<void> {
        await userRepository.deleteUserById(userId)
    }

}

export const userService = new UserService();