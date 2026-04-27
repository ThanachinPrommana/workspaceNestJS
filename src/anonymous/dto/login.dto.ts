import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    email!: string;
    @IsNotEmpty()
    password!: string;



}