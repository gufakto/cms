import { RoleModule } from "@/app/role/role.module";
import { RouteController } from "@/app/route/route.controller";
import { RouteService } from "@/app/route/route.service";
import { Route } from "@/database/entities/route.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
   imports:[
      TypeOrmModule.forFeature([Route]),
      RoleModule,
   ],
   providers: [RouteService],
   controllers: [RouteController],
   exports: [RouteService],
})
export class RouteModule{}