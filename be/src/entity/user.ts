import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number | null = null
    @Column() name: string = ""
    @Column() email: string = ""
    @Column() phone!: string
    @Column({length: 100}) password: string = ""
    @Column() created_at: Date = new Date()
    @Column() updated_at: Date = new Date()
}