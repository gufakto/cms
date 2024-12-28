import { NextFunction, Request, Response, Router } from 'express';
import { loginAuth, verifyOTPRoutes } from '../handlers/auth';

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

export default router;
