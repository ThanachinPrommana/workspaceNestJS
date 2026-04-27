import { BadRequestException, Injectable, Logger, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()



export class AnonymousService {


  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
    private userService: UserService


  ) { }

  async register(dto: registerDto) {
    // 1. สั่งให้ UserService ช่วยเช็คว่าอีเมลซ้ำไหม
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    // 2. สุ่มรหัสผ่าน (Business Logic ของฝ่ายต้อนรับ)
    // const randomPassword = Math.random().toString(36).slice(-8);

    // 3. สั่งให้ UserService บันทึกให้ (ส่งรหัสที่สุ่มได้ไปให้เขา Hash ต่อข้างใน)
    const newUser = await this.userService.create({
      firstName:dto.firstName ?? "Unknow",
      lastName:dto.lastName ?? "Unknow",
      email: dto.email,
      password: dto.password,
      isActive: dto.isActive ?? false
    });

    return {
      message: 'สมัครสมาชิกสำเร็จ',
      id: newUser.id,
      email: newUser.email
    };
  }

  async login(dto: LoginDto) {

    const user = await this.userService.findByEmailAndPassword(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    //TODO:replace this mock user with DB query



    const payload = {
      sub: user.id,
      email: user.email
    }

    const token = this.jwtService.sign(payload);

    return {
      access_token: token
    }
  }


}
