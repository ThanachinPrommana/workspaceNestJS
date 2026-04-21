import { Injectable, ValidationPipe } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';


@Injectable()



export class AnonymousService {

  
  constructor(
    private jwtService: JwtService


  ) { }

  register(dto: registerDto) {
    return 'This action will register';
  }

  login(dto: LoginDto) {
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
      sub:mockUser.id,
      email:mockUser.email
    }

    const token = this.jwtService.sign(payload);

    return {
      access_token:token
    }
  }


}
