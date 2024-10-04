import {IUser} from "../interfaces/user.interface";
import {configs} from "../config/config";

class UserPresenter {
    public toPublicResDto(user: IUser) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            age: user.age,
            avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            role: user.role,
            isVerified: user.isVerified,
            isDeleted: user.isDeleted,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}

export const userPresenter = new UserPresenter()