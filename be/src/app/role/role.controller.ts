import { Auth } from "@/app/auth/jwt/jwt.decorator";
import { CreateRoleDto, UpdateRoleDto } from "@/app/role/role.dto";
import { RoleService } from "@/app/role/role.service";
import { CustomValidationPipe } from "@/common/custom-validation.pipe";
import { ResponseWrapper } from "@/common/response-wrapper";
import { Role } from "@/database/entities/role.entity";
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('roles')
@ApiBearerAuth('access-token') // harus sama dengan nama scheme di main.ts
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService){}

    @Post()
    @Auth()
    async create(@Body(new CustomValidationPipe(400)) roleDto: CreateRoleDto): Promise<ResponseWrapper<Role>> {
        const role = await this.roleService.create(roleDto.name, roleDto.description);
        return {
            status: HttpStatus.CREATED,
            message: "success",
            data: role,
        };
    }

    @Get()
    @Auth()
    async getAll(): Promise<ResponseWrapper<Role[]>> {
        const roles = await this.roleService.findAll();
        return {
            status: HttpStatus.OK,
            message: "success",
            data: roles,
        };
    }
    @Get(':id')
    @Auth()
    async get(@Param('id') id: number): Promise<ResponseWrapper<Role>> {
        const role = await this.roleService.findOne(id);
        return {
            status: HttpStatus.OK,
            message: "founded",
            data: role,
        };
    }

    @Patch(':id')
    @Auth()
    async update(@Param('id') id: number, @Body() updateDto: UpdateRoleDto): Promise<ResponseWrapper<Role>> {
        const role = await this.roleService.update(id, updateDto.name, updateDto.description);
        return {
            status: HttpStatus.OK,
            message: "success",
            data: role,
        }
    }

    @Delete(':id')
    @Auth()
    async delete(@Param('id') id: number): Promise<{status: HttpStatus, message: string}> {
        await this.roleService.softDelete(id);
        return {
            status: HttpStatus.NO_CONTENT,
            message: `Success deleted data ${id}`
        }
    }
}