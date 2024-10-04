import {IUser} from "../interfaces/user.interface";
import {userRepository} from "../repository/user.repository";
import {ApiError} from "../errors/customApiError";
import {ITokenPayload} from "../interfaces/token.interface";
import {UploadedFile} from "express-fileupload";
import {awsS3Service} from "./aws.s3.service";
import {FileItemTypeEnum} from "../enums/file-item-type.enum";

class UserService {
    public async getListUsers(): Promise<IUser[]> {
        return await userRepository.getListUsers()
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId)
        if (!user) throw new ApiError("User not found", 404)
        return user
    }

    public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId)
        if (!user) throw new ApiError("User not found", 404)
        return user
    }

    public async updateMe(jwtPayload: ITokenPayload, dto: Partial<IUser>): Promise<IUser> {
        return await userRepository.updateById(jwtPayload.userId, dto)
    }

    public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
        return await userRepository.deleteById(jwtPayload.userId)
    }

    public async uploadAvatar(jwtPayload: ITokenPayload, file: UploadedFile): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId)

        const avatar = await awsS3Service.uploadFile(file, FileItemTypeEnum.USER, user._id)

        const updatedUser = await userRepository.updateById(user._id, {avatar})
        if (user.avatar) {
            await awsS3Service.deleteFile(user.avatar)
        }
        return updatedUser
    }

    public async deleteAvatar(jwtPayload: ITokenPayload): Promise<IUser> {

        const user = await userRepository.getById(jwtPayload.userId)

        if (user.avatar) await awsS3Service.deleteFile(user.avatar)

        return await userRepository.updateById(user._id, {avatar: null})
    }


}

export const userService = new UserService();