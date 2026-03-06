import { AuthLoginDto, AuthRefreshToken, LoginResponse } from "@/app/auth/auth.dto";
import { AuthService } from "@/app/auth/auth.service";
import { UserService } from "@/app/user/user.service";
import { CustomValidationPipe } from "@/common/custom-validation.pipe";
import { ResponseWrapper } from "@/common/response-wrapper";
import { Body, Controller, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('auth')
@Controller('auth')
export class AuthController{
   constructor(
      private readonly authService: AuthService,
   ){}

   @Post('login')
   async login(@Body(new CustomValidationPipe()) auth: AuthLoginDto): Promise<LoginResponse> {
      const user = await this.authService.login(auth);
      return user;
   }

   @Post('refresh-token')
   async refreshToken(@Body(new CustomValidationPipe()) auth: AuthRefreshToken): Promise<LoginResponse> {
      const user = await this.authService.refreshToken(auth.token);
      return user;
   }

}