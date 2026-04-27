import { IsBoolean, IsEmail,IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email!:string;

    @IsNotEmpty()
    password!:string;

    @IsBoolean()
    isActive!:boolean;


    
    @IsString()
    @Length(2,8)
    firstName!:string

    @IsString()
    @Length(2,8)
    lastName!:string

}


