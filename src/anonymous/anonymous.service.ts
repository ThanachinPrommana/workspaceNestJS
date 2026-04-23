import { Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma.service';


@Injectable()



export class AnonymousService {


  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService


  ) { }

  async register(dto: registerDto) {
    
  }

  login(dto: LoginDto) {

    const appName = this.configService.get('APP_NAME')
    const appVersion = +this.configService.get('APP_VERSION');
    const appDevMode = this.configService.get('APP_DEV_MODE') === true;

    Logger.debug(appName);
    Logger.debug(appVersion);
    Logger.debug(appDevMode);
    //TODO:replace this mock user with DB query
    const mockUser = {
      id: 1,
      email: 'chin@gmail.com',
      password: '1234'
    }

    if (dto.email !== mockUser.email || dto.password !== mockUser.password) {
      return 'Invalid credentials';
    }

    const payload = {
      sub: mockUser.id,
      email: mockUser.email
    }

    const token = this.jwtService.sign(payload);

    return {
      access_token: token
    }
  }


}
