import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { Account } from "./entity/account"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT||'5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Account],
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: [],
})