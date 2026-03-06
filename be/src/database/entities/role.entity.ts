import { Route } from "@/database/entities/route.entity";
import { User } from "@/database/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";


@Entity()
@Unique(['name'])
export class Role {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 100 }) name: string;
    @Column() description: string;
    @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;
    @DeleteDateColumn({ type: 'timestamptz' }) deletedAt?: Date | null;
    
    // RELASI
    @ManyToMany(()=> User, (user) => user.roles) users: User[]
    @ManyToMany(() => Route, route => route.roles)
    @JoinTable({ name: 'role_routes' }) // tabel pivot
    routes: Route[];

}