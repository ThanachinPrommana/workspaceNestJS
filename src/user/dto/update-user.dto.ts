import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Patch } from '@nestjs/common';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEmail({}, { message: 'Systec Error' })
    email!:string;

}
