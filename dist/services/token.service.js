"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, "jwtAccessToken", { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, "jwtRefreshToken", { expiresIn: "30d" });
        return { accessToken: accessToken, refreshToken: refreshToken };
    }
}
exports.tokenService = new TokenService();
