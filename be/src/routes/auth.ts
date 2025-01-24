import { NextFunction, Request, Response, Router } from 'express';
import { loginAuth, register, resendVerification, verification, verifyOTPRoutes } from '../handlers/auth';
import { UserCreate } from '../dtos/users';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';
import { hashPassword, verifyPassword } from '../utils/utils';
import { generateNumericOTP, verifyOTP } from '../utils/otp';
import { sendEmail } from '../utils/mailer';
import { Auth } from '../dtos/auth';
import { generateToken } from '../utils/jwt';
import { VerificationToken } from '../entity/verification-token';

const router = Router();


router.post('/login', async (req: Request<{}, {}, Auth>, res: Response, next: NextFunction): Promise<void> => {
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Authentication'
       #swagger.requestBody = {
           required: true,
           content: {
               "application/json": {
                   schema: { $ref: '#/components/schemas/Auth' }
               }
           }
       } */
           try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                console.log("TEST 1");
                res.status(400).send({message: 'Email and password are required'});
            }
            
            const repo = AppDataSource.getRepository(User);
            let data = await repo.findOneBy({ email: email })
            console.log("ASAS",data);
            if (!data) {
                console.log("TEST 2");
                res.status(401).json({message: 'Invalid identifier or password'});
            }
            if(!data?.emailVerified) {
                console.log("TEST 3");
                res.status(401).send({message: 'Email not verified'});
            }
            const check = await verifyPassword(password, data!.password);
            if (!check) {
                console.log("TEST 4");
                res.status(401).send({message: 'Invalid email or password'});
            }
            const otp = generateNumericOTP(email);
            await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
            console.log("TEST 5");
            res.status(200).send({message: 'OTP sent'});
        } catch (error) {
            next(error); // Proper error handling
        }
});

router.post('/verify-otp', async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['Auth'] */
    // await verifyOTPRoutes(req, res, next);
    try {
        const { email, otp } = req.body;
        const repo = AppDataSource.getRepository(User);
        const response = await repo.findOneBy({ email: email })
        if(response===null) {
            res.status(401).send({message: 'Your account is not registered yet!'});
        }

        const check = verifyOTP(email, otp);
        if (!check) {
            res.status(401).send({message: 'Invalid or expired OTP'});
        }

        const token = generateToken({ email }); 
        res.status(200).send({ token });
    } catch(e: any) {
        next(e);
    }
});

router.post("/register", async (req: Request<{}, {}, UserCreate>, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Register user'
       #swagger.requestBody = {
           required: true,
           content: {
               "application/json": {
                   schema: { $ref: '#/components/schemas/User' }
               }
           }
       } */
    // await register(req, res, next);
    try {
        req.body.password = await hashPassword(req.body.password);
        const checkUserByEmail = await AppDataSource.getRepository(User).findOneBy({email: req.body.email});
        if(checkUserByEmail!=null) {
            res.status(401).send({message: 'Email already registered'});
        }
        const repo = AppDataSource.getRepository(User).create(req.body);
        const results = await AppDataSource.getRepository(User).save(repo)
        // Generate token
        const token = generateToken({ email: req.body.email }); 
        const verification = AppDataSource.getRepository(VerificationToken);
        await verification.save({ identifier: req.body.email, token: token, expires: new Date(Date.now() + 1000 * 60 * 60) });
        await sendEmail(req.body.email, 'Verification Token', `Your verification token link is: ${process.env.VERIFICATION_URL}/${token}`);
        res.status(201).send(results)
    } catch(e: any) {
        next(e);
    }

})

router.get("/verification/:token", async (req: Request<{token: string},{},{}>, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Verification token register'
     */
    // await verification(req, res, next);
    try {
        const token = req.params.token;
        const verification = AppDataSource.getRepository(VerificationToken);
        const data = await verification.findOneBy({token: token});
        if(data==null) {
            res.status(401).send({message: 'Invalid token'});
        }
        if(data!.expires < new Date()) {
            res.status(401).send({message: 'Token expired'});
        }
        const user = AppDataSource.getRepository(User);
        await user.update({email: data!.identifier}, {emailVerified: new Date()}); 
        AppDataSource.getRepository(VerificationToken).delete({token: token});
        res.status(200).send({message: 'Email verified'});
        
    } catch(e: any) {
        next(e);
    }
})

router.get("/re-send-verification/:email", async (req: Request<{email: string},{},{}>, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Re-send Verification token'
     */
    // await resendVerification(req, res, next);
    try {
        const email = req.params.email;
        const user = AppDataSource.getRepository(User);
        const data = await user.findOneBy({email: email});
        if(data==null) {
            res.status(401).send({message: 'Email not registered'});
        }
        if(data!.emailVerified) {
            res.status(401).send({message: 'Email already verified'});
        }
        const verification = AppDataSource.getRepository(VerificationToken);
        const token = generateToken({ email: email }); 
        await verification.save({ identifier: email, token: token, expires: new Date(Date.now() + 1000 * 60 * 60) });
        await sendEmail(email, 'Verification Token', `Your verification token link is: ${process.env.VERIFICATION_URL}/${token}`);
        res.status(200).send({message: 'Verification token sent'});
    } catch(e: any) {
        next(e);
    }
})

export default router;
