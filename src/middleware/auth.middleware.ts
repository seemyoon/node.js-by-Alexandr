import {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/customApiError";
import {tokenService} from "../service/token.service";
import {TokenTypeEnum} from "../enums/tokenType.enum";
import {tokenRepository} from "../repository/token.repository";

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (!header) throw new ApiError("Token is not valid", 401)
            const accessToken = header.split("Bearer ")[1]
            const payload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS)
            const pair = await tokenRepository.findByParams({accessToken})
            if (!pair) throw new ApiError("Token is not valid", 401)
            req.res.locals.jwtPayload = payload
            next()
        } catch (error) {
            next(error);
        }
    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (!header) throw new ApiError("Token is not valid", 401)
            const refreshToken = header.split("Bearer ")[1]
            const payload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH)
            const pair = await tokenRepository.findByParams({refreshToken})
            if (!pair) throw new ApiError("Token is not valid", 401)
            req.res.locals.jwtPayload = payload
            req.res.locals.refreshToken = refreshToken
            next()
        } catch (error) {
            next(error);
        }

    }
}

export const authMiddleware = new AuthMiddleware();