import { NextFunction, Request, Response } from "express";
import { Auth } from "../dtos/auth";
import { verifyPassword } from "../utils/utils";
import { generateOTP, verifyOTP } from "../utils/otp";
import { sendEmail } from "../utils/mailer";
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from "../utils/jwt";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

const users: { [key: string]: { password: string } } = {
    'user@example.com': { password: bcrypt.hashSync('qwe123qwe', 10) },
};

export const loginAuth = async (req: Request<{}, {}, Auth>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({message: 'Email and password are required'});
            next()
        }

        const repo = AppDataSource.getRepository(User);
        const data = await repo.findOneBy({ email: email })
        if (!data) {
            res.status(401).send({message: 'Invalid email or password'});
            next()
        }

        const check = await verifyPassword(password, data!.password);
        if (!check) {
            res.status(401).send({message: 'Invalid email or password'});
            next()
        }

        const otp = generateOTP(email);
        await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
        res.status(200).send({message: 'OTP sent'});
    } catch (error) {
        next(error); // Proper error handling
    }
}

export const verifyOTPRoutes = (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    if (!verifyOTP(email, otp)) {
        res.status(401).send('Invalid or expired OTP');
        next()
    }

    const token = generateToken({ email });
    res.status(200).send({ token });
}



export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        req.user = verifyToken(token); 
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};
