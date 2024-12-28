import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique("UQ_VERIFICATION_TOKEN", ["identifier", "token"])
export class VerificationToken{
    @PrimaryGeneratedColumn() id: number|null=null
    @Column() identifier!: string
    @Column({unique: true}) token!: string
    @Column() expires!: Date
}