import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class registerDto {

    @IsEmail()
    email!: string;

    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
    @MinLength(8, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' })
    password!: string;

    isActive!: boolean;


    @IsString()
    @Length(2,8)
    firstName!:string;

    @IsString()
    @Length(2,8)
    lastName!:string;

    
}
