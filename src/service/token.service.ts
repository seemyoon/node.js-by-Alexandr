import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import * as jwt from 'jsonwebtoken';
import {configs} from "../config/config";
import {TokenTypeEnum} from "../enums/tokenType.enum";
import {ApiError} from "../errors/customApiError";
import * as jsonwebtoken from "jsonwebtoken";

class TokenService {
    public generateToken(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRATION});
        const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRATION});
        return {accessToken, refreshToken}
    }

    public verifyToken(token: string, typeToken: TokenTypeEnum): ITokenPayload {
        try {
            let secret: string;

            switch (typeToken) {
                case TokenTypeEnum.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET
                    break;
            }
            return jsonwebtoken.verify(token, secret) as ITokenPayload;
        } catch (error) {
            console.error(error)
            throw new ApiError("Invalid token", 401);
        }

    }
}

export const tokenService = new TokenService();
