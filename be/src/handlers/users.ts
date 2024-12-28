import { NextFunction, Request, Response } from "express"
import { UpdateUserParams, UserCreate, UserOut, UserPaginate } from "../dtos/users"
import { UserPaginationParams } from "../types/query-params"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user"
import { hashPassword } from "../utils/utils"
import { ResponseOut } from "../dtos/response"

export const getUsers = async (req: Request<{}, {}, {}, UserPaginationParams>, res: Response) => {
    const page = req.query.page || 1; // Default to page 1
    const pageSize = req.query.pageSize || 10; // Default to 10 items per page

    // Calculate offset and limit
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const repo = AppDataSource.getRepository(User);
    const [users, total] = await repo.findAndCount({
        skip,
        take,
    });
    const paginate: UserPaginate<User> = {
        page: page,
        pageSize: pageSize,
        total: total,
        data: users
    }
    const result: ResponseOut<UserPaginate<User>> = {
        status: 200,
        message: "data found",
        data: paginate,
    }
    res.send(result)
}

export const getUser = async (req: Request<{id: number}, {}, {}>, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const response = await repo.findOneByOrFail({ id: req.params.id })
        const userOut: UserOut = {
            id: response.id,
            name: response.name as string,
            email: response.email,
            phone: response.phone as string,
            created_at: response.created_at,
            updated_at: response.updated_at
        }
        const results: ResponseOut<UserOut> = {
            status: 200,
            message: "data found",
            data: userOut,

        }
        res.status(200).send(results)
    } catch(err: any){
        res.status(404).send(err.message)
    }
}

export const createUser = async (req: Request<{}, {}, UserCreate>, res: Response,) => {
    req.body.password = await hashPassword(req.body.password);
    const repo = AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(repo)
    res.status(201).send(results)
}

export const updateUser = async (req: Request<{id: number}, {}, UpdateUserParams>, res: Response, next: NextFunction) => {
    
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    if(!id) {
        res.status(403).send({message: "required id"})
        next()
    }
    
    if(!phone) {
        res.status(403).send({message: "required Phone number"})
        next()
    }
    
    try {
        const repo = AppDataSource.getRepository(User);
        const userUpdate = await repo.findOneBy({ id: id });
        if(!userUpdate) {
            res.status(404).send({
                message: "data not found"
            })
            next()
        }
        userUpdate!.name = name
        userUpdate!.email= email
        userUpdate!.phone = phone
        userUpdate!.updated_at = new Date()
        const data = await repo.save(userUpdate!);
        const result: ResponseOut<User> = {
            status: 201,
            message: "success",
            data: data
        }
        res.status(201).send(result)
    } catch(e) {
        res.status(500).send(`there is an error ${e}`)
    }

}

export const deleteUser = async (req: Request<{id: number}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const data = await repo.findOneBy({id: req.params.id});
        if(!data) {
            res.status(404).send({message: "Data not found"})
            next()
        }
        const result = await repo.remove(data!);
        const output: ResponseOut<User> = {
            status: 200,
            message: "success",
            data: result
        }
        res.status(200).send(output)
        next()
    } catch(e) {
        res.status(500).send(`There is an error: ${e}`)
        next()
    }
}