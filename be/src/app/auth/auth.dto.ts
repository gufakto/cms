import { User } from "@/database/entities/user.entity";
import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isString, MinLength } from "class-validator";

export class AuthLoginDto{
   @ApiProperty({ example: 'john@gmail.com', description: "identity user" })
   @IsEmail({}, {message: "Email is not valid"})
   @IsNotEmpty({ message: "Identity required" })
   identity: string;

   @ApiProperty({example: 'Qwe123Qwe.', description: 'fill the password'})
   @IsString()
   @IsNotEmpty({message: "required password"})
   @MinLength(6, { message: 'Password min length 6 character' })
   password: string;
}

export class AuthRefreshToken{
   @ApiProperty({ example: 'xxxx', description: 'input refresh token' })
   @IsString()
   @IsNotEmpty({ message: 'required refresh token' })
   token: string;

}

export class LoginResponse{
   status: HttpStatus;
   message?: string;
   token: string;
   refres_token: string;
   user: User;
}

