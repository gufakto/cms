import { AuthController } from "@/app/auth/auth.controller";
import { AuthService } from "@/app/auth/auth.service";
import { JwtStrategy } from "@/app/auth/jwt/jwt.strategy";
import { User } from "@/database/entities/user.entity";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
   imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
         inject: [ConfigService],
         useFactory:(config: ConfigService) => ({
            secret: config.get<string>("JWT_SECRET"),
            signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") || '1h' },
         }),
      }),
   ],
   providers: [AuthService, JwtStrategy],
   controllers: [AuthController],
   exports:[AuthService, JwtStrategy],
})
export class AuthModule{}