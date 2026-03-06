import { AuthLoginDto, LoginResponse } from "@/app/auth/auth.dto";
import { UserService } from "@/app/user/user.service";
import { User } from "@/database/entities/user.entity";
import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from "class-transformer";
import { Repository } from "typeorm";


@Injectable()
export class AuthService{
   constructor(
      @InjectRepository(User) private readonly userRepo: Repository<User>,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
   ){}

   async login(auth: AuthLoginDto): Promise<LoginResponse> {
      const user = await this.userRepo.findOne({ 
         where: { email: auth.identity },
         relations: ['roles']
      });
      if(!user) {
         throw new UnauthorizedException(`Email you enter is wrong`);
      }
      const checkPassword = bcrypt.compare(user.password, auth.password);
      if(!checkPassword) {
         throw new UnauthorizedException(`Password you enter is wrong`);
      }
      
      const plainUser = instanceToPlain(user);
      const token = this.jwtService.sign(plainUser, {
         secret: this.configService.get<string>('JWT_SECRET'),
         expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      });
      const refreshToken = this.jwtService.sign(plainUser, {
         secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
         expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      });
      return {
         status: HttpStatus.OK,
         message: "Success",
         token: token,
         refres_token: refreshToken,
         user: user,
      }
   }

   async refreshToken(refresh_token: string): Promise<LoginResponse> {
      try {
         const payload = this.jwtService.verify(refresh_token,{
            secret: this.configService.get('JWT_REFRESH_SECRET'),
         });

         const user = await this.userRepo.findOne({ where: { email: payload.email } });
         if (!user) throw new UnauthorizedException('User not found');
         const plainUser = instanceToPlain(user);
         const token = this.jwtService.sign(plainUser, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
         });
         const refreshToken = this.jwtService.sign(plainUser, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
         });
         return {
            status: HttpStatus.OK,
            message: "Success",
            token: token,
            refres_token: refreshToken,
            user: user,
         }
      } catch(err){
         console.log(err)
         throw new UnauthorizedException(`invalid refresh token`);
      }
   }
}