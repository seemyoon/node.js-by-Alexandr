import * as bcrypt from 'bcrypt';

class PasswordService {
    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    public async comparePassword(passwordDto: string,hashedPassword: string ): Promise<boolean> {
        return bcrypt.compare(passwordDto, hashedPassword);
    }
}

export const passwordService = new PasswordService();