import { CreateUserDto, UpdateUserDto } from "@/app/user/user.dto";
import { UserService } from "@/app/user/user.service";
import { CustomValidationPipe } from "@/common/custom-validation.pipe";
import { ResponseWrapper } from "@/common/response-wrapper";
import { User } from "@/database/entities/user.entity";
import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";


@ApiTags('users')
@ApiBearerAuth('bearer')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body(new CustomValidationPipe()) userDto: CreateUserDto): Promise<ResponseWrapper<User>> {
        const user = await this.userService.create(userDto);
        return {
            status: HttpStatus.CREATED,
            message: "Success",
            data: user,
        }
    }
    @Get()
    async getAll(): Promise<ResponseWrapper<User[]>> {
        const users = await this.userService.findAll();
        return {
            status: HttpStatus.OK,
            data: users,
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<ResponseWrapper<User>> {
        const user = await this.userService.findOne(id);
        return {
            status: HttpStatus.OK,
            data: user,
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: number, 
        @Body() userUpdate: any,
    ): Promise<ResponseWrapper<User>> {
        const dto = plainToInstance(UpdateUserDto, {...userUpdate, id});
        console.log("CTRL",dto)
        await validateOrReject(dto)
        const user = await this.userService.update(dto);
        return {
            status: HttpStatus.OK,
            message: "User updated successfully",
            data: user,
        }
    }
}