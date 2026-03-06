import { UserService } from "@/app/user/user.service";
import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({async: true})
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private readonly userService: UserService){}
    
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const object = args.object as any; // DTO
        const userId = object.id; // ambil ID dari DTO jika ada
        const user = await this.userService.findByEmail(value);
        console.log("DONAL", object)
        if (!user) return true; // email belum dipakai
        
        // jika user yang sama (update), maka tetap valid
        if (userId && user.id === userId) return true;
        return false; // email sudah dipakai user lain
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `Email ${validationArguments} already in used`;
    }

}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        });
    }
}