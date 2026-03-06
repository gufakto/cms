import { AuthModule } from "@/app/auth/auth.module";
import { RoleController } from "@/app/role/role.controller";
import { RoleService } from "@/app/role/role.service";
import { Role } from "@/database/entities/role.entity";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        AuthModule,
    ],
    providers: [RoleService],
    controllers: [RoleController],
    exports: [RoleService]
})
export class RoleModule {}
