import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity()
export class Account{
    @PrimaryGeneratedColumn() id: number|null=null
    @Column() user_id!: number
    @Column() type!: string
    @Column() provider!: string
    @Column() provider_account_id!: string
    @Column() refresh_token?: string
    @Column() access_token?: string
    @Column() expires_at?: number
    @Column() token_type?: string
    @Column() scope?: string
    @Column() id_token?: string
    @Column() session_state?: string
    @Column() created_at: Date = new Date()
    @ManyToOne(() => User, (user: User) => user.accounts) user!: User
}