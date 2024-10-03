import {OldPassword} from "../models/old-password.model";
import {IOldPassword} from "../interfaces/old-password.interface";

class OldPasswordRepository {
    public async create(dto: Partial<IOldPassword>): Promise<IOldPassword> {
        return await OldPassword.create(dto);
    }

    public async findByParams(userId: string): Promise<IOldPassword[]> {
        return await OldPassword.find({_userId: userId})
    }

    public async deleteManyByParams(date: Date): Promise<number> {
        const {deletedCount}= await OldPassword.deleteMany({
            createdAt: {$lt: date},
        });
        return deletedCount
    }

}

export const oldPasswordRepository = new OldPasswordRepository();