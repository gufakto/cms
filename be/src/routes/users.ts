import { NextFunction, Request, Response, Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../handlers/users';
import { UserPaginationParams } from '../types/query-params';
import { UpdateUserParams } from '../dtos/users';

const router = Router();

router.get("/users", async (req: Request<{}, {}, {}, UserPaginationParams>, res: Response)=> {
    /* #swagger.tags = ['User']
       #swagger.summary = 'Get Users'
       #swagger.parameters['page'] = {
           in: 'query',
           description: 'page (default 1)',
           type: 'number',
           required: false
       } 
       #swagger.parameters['pageSize'] = {
           in: 'query',
           description: 'pageSize (default 10)',
           type: 'number',
           required: false
       } */
    await getUsers(req, res)
})

router.get("/users/:id", async (req: Request<{id: number}, {}, {}>, res: Response) => {
    /* #swagger.tags = ['User'] 
       #swagger.summary = 'Get User by ID'
       */
      await getUser(req, res)
})

router.post("/users", async (req: Request, res: Response) => {
    /* #swagger.tags = ['User']
       #swagger.summary = 'Create a user'
       #swagger.requestBody = {
           required: true,
           content: {
               "application/json": {
                   schema: { $ref: '#/components/schemas/User' }
               }
           }
       } */
    await createUser(req, res)
})

router.put("/users/:id", async (req: Request<{id: number}, {}, UpdateUserParams>, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['User'] 
       #swagger.summary = 'Update User'
       #swagger.requestBody = {
           required: true,
           content: {
               "application/json": {
                   schema: { $ref: '#/components/schemas/UpdateUser' }
               }
           }
       }
       */
    await updateUser(req, res, next)
})

router.delete("/users/:id", async (req: Request<{id: number}, {}, {}>, res: Response, next: NextFunction) => {
    /* #swagger.tags = ['User'] 
       #swagger.summary = 'Delete User'
       
       */
    await deleteUser(req, res, next);
})


export default router;