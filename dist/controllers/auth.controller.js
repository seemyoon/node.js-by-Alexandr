"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async login(req, res, next) {
        try {
            const tokenPair = await auth_service_1.authService.login(req.body);
            return res.status(201).json({ ...tokenPair });
        }
        catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            await auth_service_1.authService.register(req.body);
            return res.status(201).json({ message: "User was registered" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.authController = new AuthController();
