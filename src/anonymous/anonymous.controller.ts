import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { LoginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { Public } from 'src/config/public.decoretor';

@Controller('anonymous')
export class AnonymousController {
  constructor(private readonly anonymousService: AnonymousService) { }
  
  @Public()
  @Post('register')
  register(@Body() dto: registerDto) {
    return this.anonymousService.register(dto);
  }
   @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.anonymousService.login(dto);
  }
}
