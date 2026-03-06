import { Role } from "@/database/entities/role.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['method', 'path'])
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  method: string;

  @Column({length: 200})
  path: string;

  @Column({length: 200})
  controller: string;

  @Column({length: 200})
  handler: string;
  
  // relasi
  @ManyToMany(() => Role, role => role.routes)
  roles: Role[];
}