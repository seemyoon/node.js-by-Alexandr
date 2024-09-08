"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_error_1 = require("../errors/api.error");
const User_model_1 = require("../models/User.model");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async login(body) {
        try {
            const { password, email } = body;
            const user = await User_model_1.User.findOne({ email });
            if (!user)
                throw new api_error_1.ApiError("Invalid email", 401);
            const isMatch = await password_service_1.passwordService.compare(password, user.password);
            if (!isMatch)
                throw new api_error_1.ApiError("Invalid password", 401);
            return token_service_1.tokenService.generateTokenPair({ id: user._id });
        }
        catch (error) {
            throw new api_error_1.ApiError(error.message, error.status);
        }
    }
    async register(body) {
        try {
            const { password } = body;
            const hashedPassword = await password_service_1.passwordService.hash(password);
            await User_model_1.User.create({ ...body, password: hashedPassword });
        }
        catch (error) {
            throw new api_error_1.ApiError(error.message, error.status);
        }
    }
}
exports.authService = new AuthService();
