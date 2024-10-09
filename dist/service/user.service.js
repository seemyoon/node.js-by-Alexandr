"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repository/user.repository");
const customApiError_1 = require("../errors/customApiError");
const aws_s3_service_1 = require("./aws.s3.service");
const file_item_type_enum_1 = require("../enums/file-item-type.enum");
const user_presenter_1 = require("../presenters/user.presenter");
class UserService {
    async getListUsers(query) {
        const [entities, total] = await user_repository_1.userRepository.getListUsers(query);
        return user_presenter_1.userPresenter.toListResDto(entities, total, query);
    }
    async getById(userId) {
        const user = await user_repository_1.userRepository.getById(userId);
        if (!user)
            throw new customApiError_1.ApiError("User not found", 404);
        return user;
    }
    async getMe(jwtPayload) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        if (!user)
            throw new customApiError_1.ApiError("User not found", 404);
        return user;
    }
    async updateMe(jwtPayload, dto) {
        return await user_repository_1.userRepository.updateById(jwtPayload.userId, dto);
    }
    async deleteMe(jwtPayload) {
        return await user_repository_1.userRepository.deleteById(jwtPayload.userId);
    }
    async uploadAvatar(jwtPayload, file) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        const avatar = await aws_s3_service_1.awsS3Service.uploadFile(file, file_item_type_enum_1.FileItemTypeEnum.USER, user._id);
        const updatedUser = await user_repository_1.userRepository.updateById(user._id, { avatar });
        if (user.avatar) {
            await aws_s3_service_1.awsS3Service.deleteFile(user.avatar);
        }
        return updatedUser;
    }
    async deleteAvatar(jwtPayload) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        if (user.avatar)
            await aws_s3_service_1.awsS3Service.deleteFile(user.avatar);
        return await user_repository_1.userRepository.updateById(user._id, { avatar: null });
    }
}
exports.userService = new UserService();
