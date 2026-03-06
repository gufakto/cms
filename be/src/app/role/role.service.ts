import { Role } from "@/database/entities/role.entity";
import { Route } from "@/database/entities/route.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    ){}

    async findAll(withDeleted: boolean = false): Promise<Role[]> {
        return this.roleRepo.find({
            withDeleted: withDeleted
        });
    }

    async create(name: string, description: string, routes: Route[]=[]): Promise<Role> {
        const role = this.roleRepo.create({
            name,
            description,
            routes,
        });
        return this.roleRepo.save(role);
    }
    
    async findOne(id: number): Promise<Role> {
        const role = await this.roleRepo.findOne({
            where: {id},
            relations: ['routes']
        });
        if(!role) throw new NotFoundException(`Role ${id} not found`);
        return role;
    }

    async update(id: number, name: string, description: string, routes: Route[]=[]): Promise<Role> {
        const role = await this.findOne(id);
        role.name = name;
        role.description = description;
        if(routes.length>0) {
            role.routes = routes;
        }
        return this.roleRepo.save(role);
    }

    async softDelete(id: number): Promise<void> {
        await this.roleRepo.softDelete(id);
    }

    async remove(id: number): Promise<void> {
        const role = await this.findOne(id);
        await this.roleRepo.remove(role);
    }

    async restore(id: number): Promise<void> {
        await this.roleRepo.restore(id);
    }

    async findByName(name: string): Promise<Role> {
        const role = await this.roleRepo.findOne({
            where: {name}
        });
        // if(!role) throw new NotFoundException(`Role ${name} is not found`);
        return role;
    }

    async findByIds(ids: number[]): Promise<Role[]> {
        const roles = await this.roleRepo.find({
            where: {
                id: In(ids)
            }
        });
        return roles;
    }
}