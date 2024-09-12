import {read, write} from "../service/fs.service";
import {IUser} from "../interfaces/user.interface";
import {ApiError} from "../errors/customApiError";


class UserRepository {
    public async getListUsers(): Promise<IUser[]> {
        return await read()
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        const users = await read()
        const newUser = {
            id: users.length ? users[users.length - 1]?.id + 1 : 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        }
        users.push(newUser)
        await write(users)
        return newUser
    }

    public async getUserById(userId: number): Promise<IUser> {
        const users = await read()
        return users.find(user => user.id === userId)
    }

    public async updateUserById(userId: number, dto: Partial<IUser>): Promise<IUser> {
        const users = await read()
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === 1) throw new ApiError("User not found", 404)
        users[userIndex].email = dto.email
        users[userIndex].name = dto.name
        users[userIndex].password = dto.password

        await write(users)
        return users[userIndex]
    }

    public async deleteUserById(userId: number): Promise<IUser> {
        const users = await read()
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) throw new ApiError("User not found", 404)
        users.splice(userIndex, 1);

        await write(users)
        return users[userIndex]
    }
}


export const userRepository = new UserRepository()