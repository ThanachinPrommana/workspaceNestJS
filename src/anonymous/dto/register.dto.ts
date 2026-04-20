import { IsEmail } from "class-validator";

export class registerDto{

    @IsEmail()
    email!: string;
}
