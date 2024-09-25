import {IUser} from "../interfaces/user.interface";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {userRepository} from "../repository/user.repository";
import {ApiError} from "../errors/customApiError";
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repository/token.repository";
import {emailService} from "./email.service";
import {EmailTypeEnum} from "../enums/email.enum";
import {configs} from "../config/config";

class AuthService {
    public async signUp(dto: Partial<IUser>): Promise<{ user: IUser, tokens: ITokenPair }> {
        await this.isEmailExistOrThrow(dto.email)
        const password = await passwordService.hashPassword(dto.password)
        const user = await userRepository.create({...dto, password})
        const tokens = tokenService.generateToken({userId: user._id, role: user.role})
        await tokenRepository.create({...tokens, _userId: user._id})
        await emailService.sendMail(configs.SMTP_EMAIL, EmailTypeEnum.WELCOME, {name: user.name})
        return {user, tokens}
    }


    public async signIn(dto: Partial<IUser>): Promise<{ user: IUser, tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email)
        if (!user) throw new ApiError("User not found", 404)

        const isPasswordMatch = await passwordService.comparePassword(dto.password, user.password)
        if (!isPasswordMatch) throw new ApiError("Invalid fields", 401)

        const tokens = tokenService.generateToken({userId: user._id, role: user.role})

        await tokenRepository.create({...tokens, _userId: user._id})
        return {user, tokens}
    }

    public async refresh(refreshToken: string, payload: ITokenPayload): Promise<ITokenPair> {
        await tokenRepository.deleteByParams({refreshToken})

        const tokens = tokenService.generateToken({userId: payload.userId, role: payload.role})

        await tokenRepository.create({...tokens, _userId: payload.userId})
        return tokens
    }

    public async logOutDevice(tokenId: string, jwtPayload: ITokenPayload): Promise<void> {
        const user = await userRepository.getById(jwtPayload.userId)
        await tokenRepository.deleteByParams({_id: tokenId});
        await emailService.sendMail(configs.SMTP_EMAIL, EmailTypeEnum.LOGOUT, {name: user.name})

    }

    public async logOutAllDevices(jwtPayload: ITokenPayload): Promise<void> {
        const user = await userRepository.getById(jwtPayload.userId)
        await tokenRepository.deleteManyByParams({_userId: user._id})
        await emailService.sendMail(configs.SMTP_EMAIL, EmailTypeEnum.LOGOUT, {name: user.name})
    }

    private async isEmailExistOrThrow(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email)
        if (user) throw new ApiError("User already exists", 409)
    }
}

export const authService = new AuthService();