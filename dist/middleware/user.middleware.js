"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const users_db_1 = require("../db/users.db");
const api_error_1 = require("../errors/api.error");
class UserMiddleware {
    async findByIdOrThrow(req, res, next) {
        try {
            const { id } = req.params;
            const user = users_db_1.users[+id];
            if (!user) {
                throw new api_error_1.ApiError("User not found", 400);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
