import { IsEmailUnique } from "@/common/email.validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message: "required name"}) 
    name: string;

    @ApiProperty({ example: 'john@gmail.com' })
    @IsString() 
    @IsNotEmpty()
    @IsEmail()
    @IsEmailUnique({ message: "Email already in used!" })
    email: string;

    @ApiProperty({ example: 'P@ssw0rd123' })
    @IsString()
    @MinLength(6, { message: 'Password minimal 6 karakter' })
    @MaxLength(20, { message: 'Password maksimal 20 karakter' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password harus mengandung huruf kapital' })
    @Matches(/(?=.*[a-z])/, { message: 'Password harus mengandung huruf kecil' })
    @Matches(/(?=.*\d)/, { message: 'Password harus mengandung angka' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Password harus mengandung simbol (@$!%*?&)' })
    password: string;

    @ApiProperty({ example: 'https://[url]/image.jpg' })
    @IsString()
    profile: string;
    
    @ApiProperty({ example: 'true' })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ example: [1,2] })
    @IsArray()
    roles: number[];
}

export class UpdateUserDto{
    @Expose()
    id?: number;
    
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message: "required name"}) 
    name: string;

    @ApiProperty({ example: 'john@gmail.com' })
    @IsString() 
    @IsNotEmpty()
    @IsEmail()
    @IsEmailUnique({ message: "Email already in used!" })
    email: string;

    @ApiProperty({ example: 'https://[url]/image.jpg' })
    @IsString()
    profile: string;
    
    @ApiProperty({ example: 'true' })
    @IsBoolean()
    isActive: boolean;
    
    @IsArray()
    @ApiProperty({ example: [1,2] })
    roles: number[];
}