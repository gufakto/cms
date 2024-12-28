import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account";


@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number | null = null
    @Column() name?: string
    @Column({unique: true}) email!: string
    @Column({nullable: true}) emailVerified?: Date
    @Column({nullable: true}) image?: string
    @Column() phone?: string
    @Column({length: 100}) password!: string
    @Column() created_at: Date = new Date()
    @Column() updated_at: Date = new Date()
    @OneToMany(() => Account, (account) => account.user) accounts?: Account[]
}