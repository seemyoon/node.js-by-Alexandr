import * as bcrypt from 'bcrypt';

class PasswordService {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    async comparePassword(passwordDto: string,hashedPassword: string ): Promise<boolean> {
        return await bcrypt.compare(passwordDto, hashedPassword);
    }
}

export const passwordService = new PasswordService();