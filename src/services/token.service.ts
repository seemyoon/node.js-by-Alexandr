import jwt from 'jsonwebtoken';
import {Types} from 'mongoose';

import {IJwt} from "../models/IJwt";

interface ITokenPair {
    id: Types.ObjectId
}

class TokenService {
    public generateTokenPair(payload: ITokenPair): IJwt {
        const accessToken = jwt.sign(payload, "jwtAccessToken", {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, "jwtRefreshToken", {expiresIn: "30d"})
        return {accessToken: accessToken, refreshToken: refreshToken}
    }
}

export const tokenService = new TokenService();