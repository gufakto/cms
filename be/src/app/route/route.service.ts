import { RoleService } from "@/app/role/role.service";
import { Role } from "@/database/entities/role.entity";
import { Route } from "@/database/entities/route.entity";
import { Injectable, RequestMethod } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModulesContainer, Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { In, InsertResult, Repository } from "typeorm";


@Injectable()
export class RouteService {
   constructor(
      @InjectRepository(Route) private readonly routeRepo: Repository<Route>,
      private readonly modulesContainer: ModulesContainer,
      private readonly roleService: RoleService,
      private readonly config: ConfigService,
      private readonly reflector: Reflector,
   ){}

   
   async _bulkInsert(routes: Route[]) :Promise<number[]> {
      const dataToUpsert = routes.map(({ id, ...rest }) => rest);
      const data: InsertResult = await this.routeRepo.upsert(dataToUpsert, ['method', 'path']); 
      return data.identifiers.map(v=> v.id);
   }

   async _assignroutesToDefault(routes: Route[]): Promise<Role> {
      const name = this.config.get<string>("SUDO_LEVEL");
      const desc = this.config.get<string>("SUDO_DESC");
      let role = await this.roleService.findByName(name);
      if(!role) {
         role = await this.roleService.create(
            name,
            desc,
            routes
         )
      }
      role = await this.roleService.update(role.id, name, desc, routes); 
      return role;
   }


   async scanRoutes(): Promise<Route[]> {
      const routes: Route[] = [];
      

      for (const [moduleKey, moduleRef] of this.modulesContainer.entries()) {
         const controllers = moduleRef.controllers;

         controllers.forEach(({ metatype, instance }) => {
         if (!instance) return;

         const controllerPrefix = Reflect.getMetadata('path', metatype) || '';
         const controllerName = metatype.name;
         const controllerWithoutSuffix = controllerName.replace(/Controller$/, '');

         // ambil semua method handler
         const methods = Object.getOwnPropertyNames(metatype.prototype)
            .filter(method => method !== 'constructor' && typeof instance[method] === 'function');

         methods.forEach(methodName => {
            const methodRef = metatype.prototype[methodName];
            const path = Reflect.getMetadata('path', methodRef);
            const requestMethod = Reflect.getMetadata('method', methodRef); // GET, POST, etc

            if (path && requestMethod !== undefined) {
               const methodString = RequestMethod[requestMethod]; // convert enum ke string
               let fullPath = `/v1/api/${controllerPrefix}/${path}`.replace(/\/+/g, '/');
               
               // hapus trailing slash jika ada
               if (fullPath !== '/' && fullPath.endsWith('/')) {
                  fullPath = fullPath.slice(0, -1);
               }
               routes.push({
                  id: null,
                  method: methodString.toUpperCase(),
                  path: fullPath,
                  controller: controllerWithoutSuffix,
                  handler: methodName,
                  roles: [],
               });
            }
         });
         });
      }

      
      const ids = await this._bulkInsert(routes);
      const routesRes = await this.routeRepo.find({ where: { id: In(ids) } }); 
      const role = await this._assignroutesToDefault(routesRes);
      // console.log(role);
      return routes;
   }

   async list(): Promise<Route[]> {
      const routes = await this.routeRepo.find();
      return routes;
   }
}