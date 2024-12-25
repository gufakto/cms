
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../utils/utils";

AppDataSource.initialize().then(async () => {
    const pass = await hashPassword("qwe123qwe");
    for(var i=0; i<10; i++) {
        const user = new User();
        user.name = faker.person.fullName();
        user.email = faker.internet.email();
        user.phone = faker.phone.number();
        user.password = pass;
        user.created_at = new Date();
        user.updated_at = new Date();
        const repo = AppDataSource.getRepository(User).create(user);
        await AppDataSource.getRepository(User).save(repo)
        
    }
}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})