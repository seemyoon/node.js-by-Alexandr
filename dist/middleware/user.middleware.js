"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const user_service_1 = require("../services/user.service");
const user_validators_1 = require("../validators/user.validators");
class UserMiddleware {
    async findByIdOrThrow(req, res, next) {
        try {
            const { id } = req.params;
            const user = await user_service_1.userService.findById(id);
            if (!user) {
                throw new api_error_1.ApiError("User not found", 404);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
    async isValidRegister(req, res, next) {
        try {
            const { error } = user_validators_1.UserValidators.createUser.validate(req.body);
            if (error)
                throw new api_error_1.ApiError(error.message, 404);
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
