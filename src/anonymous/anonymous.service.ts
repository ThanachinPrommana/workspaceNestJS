import { Injectable,ValidationPipe } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AnonymousService {
  register(dto:registerDto) {
    return 'This action will register';
  }

  login(dto:LoginDto) {
    
    return `This action will login with ${dto.email} and ${dto.password}`;
  }

 
}
