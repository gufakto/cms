import { Role } from "@/database/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 125 }) name: string;
    @Column({ length: 100 }) email: string;
    @Column({ length: 100 }) password: string;
    @Column({ length: 200 }) profile: string;
    @Column() isActive: boolean;
    @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;
    @DeleteDateColumn({ type: 'timestamptz' }) deletedAt?: Date | null;

    // RELASI
    @ManyToMany(() => Role, (role)=>role.users, {cascade: true}) 
    @JoinTable({name: 'user_roles'}) roles: Role[];
}