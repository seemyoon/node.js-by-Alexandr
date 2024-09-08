import {ApiError} from "../errors/api.error";
import {IJwt} from "../models/IJwt";
import {IUser} from "../models/IUser";
import {User} from "../models/User.model";
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";

interface ICredentials {
    email: string;
    password: string;
}

class AuthService {
    public async login(body: ICredentials): Promise<IJwt> {
        try {
            const {password, email} = body
            const user = await User.findOne({email})
            if (!user) throw new ApiError("Invalid email or password", 401)

            const isMatch = await passwordService.compare(password, user.password)
            if (!isMatch) throw new ApiError("Invalid email or password", 401)

            return tokenService.generateTokenPair({id: user._id})
        } catch (error) {
            throw new ApiError(error.message, error.status)
        }

    }

    public async register(body: IUser): Promise<void> {
        try {
            const {password} = body;
            const hashedPassword = await passwordService.hash(password)
            await User.create({...body, password: hashedPassword});
        } catch (error) {
            throw new ApiError(error.message, error.status)
        }
    }
}

export const authService = new AuthService();