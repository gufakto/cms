import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Adjust this based on your security needs
    return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
