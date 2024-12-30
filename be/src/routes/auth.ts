import { NextFunction, Request, Response, Router } from 'express';
import { loginAuth, register, verification, verifyOTPRoutes } from '../handlers/auth';
import { UserCreate } from '../dtos/users';

const router = Router();


router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
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
    await loginAuth(req, res, next)
});

router.post('/verify-otp', async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['Auth'] */
    await verifyOTPRoutes(req, res, next);
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
    await register(req, res, next);
})

router.get("/verification/:token", async (req: Request<{token: string},{},{}>, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'Verification token register'
     */
    await verification(req, res, next);
})

export default router;
