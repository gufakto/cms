import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";


export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Role name' })
    @IsString()
    @MinLength(2, { message: "Required role name." })
    name: string;
    @ApiProperty({ example: 'admin', description: 'Role description' })
    @IsString()
    description: string;
}

export class UpdateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Role name' })
    @IsString()
    @MinLength(2, { message: "Required role name." })
    name: string;
    @ApiProperty({ example: 'admin', description: 'Role description' })
    @IsString()
    description: string;
}