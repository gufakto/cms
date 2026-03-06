import { CreateUserDto, UpdateUserDto } from "@/app/user/user.dto";
import { User } from "@/database/entities/user.entity";
import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "@/database/entities/role.entity";


export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    ){}

    async findAll(): Promise<User[]> {
        return this.userRepo.find({
            relations: ['roles'],
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({
            where: {id}
        });
        if(!user) throw new NotFoundException(`User ${id} not found`);
        return user;
    }

   async findByEmail(email: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { email, }
        });
        return user;
   }

   async create(userDto: CreateUserDto): Promise<User> {
        let roles: Role[] = []; 
        
        if(userDto.roles.length>0) {
            roles = await this.roleRepo.find({where: { id: In(userDto.roles) }});
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user = this.userRepo.create({
            name: userDto.name,
            email: userDto.email,
            isActive: userDto.isActive,
            password: hashedPassword,
            profile: userDto.profile,
            roles: roles,
        });

        return this.userRepo.save(user);
   }

   async update(userDto: UpdateUserDto): Promise<User> {
        let roles: Role[] = [];
        if(userDto.roles.length>0) {
            roles = await this.roleRepo.find({ where: { id: In(userDto.roles) }});
        }
        const user = await this.findOne(userDto.id);
        user.name = userDto.name;
        user.email = userDto.email;
        user.profile = userDto.profile;
        user.isActive = userDto.isActive;
        user.roles = roles;

        return this.userRepo.save(user);
   }

   async softDelete(id: number): Promise<void> {
        await this.userRepo.softDelete(id);
   } 

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
    }

    async restore(id: number): Promise<void> {
        await this.userRepo.restore(id);
    }
}