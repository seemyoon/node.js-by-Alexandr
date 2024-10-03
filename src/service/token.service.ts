import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import * as jwt from 'jsonwebtoken';
import {configs} from "../config/config";
import {TokenTypeEnum} from "../enums/tokenType.enum";
import {ApiError} from "../errors/customApiError";
import {ActionTokenTypeEnum} from "../enums/actionTokenType.enum";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
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
                default:
                    throw new ApiError("Invalid token type", 401);
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (error) {
            console.error(error)
            throw new ApiError("Invalid token", 401);
        }

    }

    public verifyActionToken(token: string, typeToken: ActionTokenTypeEnum): ITokenPayload {
        try {
            let secret: string;
            switch (typeToken) {
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = configs.ACTION_FORGOT_PASSWORD_SECRET
                    break
                case ActionTokenTypeEnum.VERIFY_EMAIL:
                    secret = configs.ACTION_VERIFY_EMAIL_SECRET
                    break
                default:
                    throw new ApiError("Invalid token type", 401);

            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (error) {
            console.error(error)
            throw new ApiError("Invalid token", 401);
        }

    }

    public generateActionTokens(payload: ITokenPayload, tokenType: ActionTokenTypeEnum): string {
        let secret: string;
        let expiresIn: string;
        switch (tokenType) {
            case ActionTokenTypeEnum.FORGOT_PASSWORD:
                secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
                expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
                break;
            case ActionTokenTypeEnum.VERIFY_EMAIL:
                secret = configs.ACTION_VERIFY_EMAIL_SECRET;
                expiresIn = configs.ACTION_VERIFY_EMAIL_EXPIRATION;
                break
            default:
                throw new ApiError("Invalid token", 401);
        }
        return jwt.sign(payload, secret, {expiresIn});
    }
}

export const tokenService = new TokenService();
