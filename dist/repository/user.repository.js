"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const fs_service_1 = require("../service/fs.service");
const customApiError_1 = require("../errors/customApiError");
class UserRepository {
    async getListUsers() {
        return await (0, fs_service_1.read)();
    }
    async create(dto) {
        const users = await (0, fs_service_1.read)();
        const newUser = {
            id: users.length ? users[users.length - 1]?.id + 1 : 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await (0, fs_service_1.write)(users);
        return newUser;
    }
    async getUserById(userId) {
        const users = await (0, fs_service_1.read)();
        return users.find(user => user.id === userId);
    }
    async updateUserById(userId, dto) {
        const users = await (0, fs_service_1.read)();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === 1)
            throw new customApiError_1.ApiError("User not found", 404);
        users[userIndex].email = dto.email;
        users[userIndex].name = dto.name;
        users[userIndex].password = dto.password;
        await (0, fs_service_1.write)(users);
        return users[userIndex];
    }
    async deleteUserById(userId) {
        const users = await (0, fs_service_1.read)();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1)
            throw new customApiError_1.ApiError("User not found", 404);
        users.splice(userIndex, 1);
        await (0, fs_service_1.write)(users);
        return users[userIndex];
    }
}
exports.userRepository = new UserRepository();
