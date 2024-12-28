import { NextFunction, Request, Response } from "express";
import { Auth } from "../dtos/auth";
import { hashPassword, verifyPassword } from "../utils/utils";
import { generateOTP, verifyOTP } from "../utils/otp";
import { sendEmail } from "../utils/mailer";
import { generateToken, verifyToken } from "../utils/jwt";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { UserCreate } from "../dtos/users";


export const loginAuth = async (req: Request<{}, {}, Auth>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({message: 'Email and password are required'});
        }

        const repo = AppDataSource.getRepository(User);
        const data = await repo.findOneBy({ email: email })
        if (!data) {
            return res.status(401).send({message: 'Invalid email or password'});
        }

        const check = await verifyPassword(password, data!.password);
        if (!check) {
            return res.status(401).send({message: 'Invalid email or password'});
        }

        const otp = generateOTP(email);
        await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
        res.status(200).send({message: 'OTP sent'});
    } catch (error) {
        next(error); // Proper error handling
    }
}

export const verifyOTPRoutes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;
        const repo = AppDataSource.getRepository(User);
        const response = await repo.findOneBy({ email: email })
        if(response===null) {
            res.status(401).send({message: 'Your account is not registered yet!'});
        }
        if (!verifyOTP(email, otp)) {
            res.status(401).send({message: 'Invalid or expired OTP'});
        }

        const token = generateToken({ email }); 
        res.status(200).send({ token });
    } catch(e: any) {
        next(e);
    }
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

export const register = async (req: Request<{}, {}, UserCreate>, res: Response, next: NextFunction) => {
    try {
        req.body.password = await hashPassword(req.body.password);
        const repo = AppDataSource.getRepository(User).create(req.body);
        const results = await AppDataSource.getRepository(User).save(repo)
        res.status(201).send(results)
    } catch(e: any) {
        next(e);
    }
}