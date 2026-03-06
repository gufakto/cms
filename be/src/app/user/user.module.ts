import { UserController } from "@/app/user/user.controller";
import { UserService } from "@/app/user/user.service";
import { IsEmailUniqueConstraint } from "@/common/email.validator";
import { Role } from "@/database/entities/role.entity";
import { User } from "@/database/entities/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
    ],
    providers: [UserService, IsEmailUniqueConstraint],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule{}