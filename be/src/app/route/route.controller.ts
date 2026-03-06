import { RouteService } from "@/app/route/route.service";
import { ResponseWrapper } from "@/common/response-wrapper";
import { Route } from "@/database/entities/route.entity";
import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@ApiTags('route')
@Controller('route')
export class RouteController {
   constructor(
      private readonly routeService : RouteService, 
   ){}

   @Get()
   async getList(): Promise<ResponseWrapper<Route[]>> {
      const routes = await this.routeService.list()
      return {
         status: HttpStatus.OK,
         message: "Founded",
         data: routes,
      }
   }
}