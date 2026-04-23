import { Controller, Get } from '@nestjs/common';
import { Public } from './config/public.decoretor';


@Controller('posts')
export class HealthController {
  // constructor(private readonly appService: AppService) {}
  @Public()
  @Get('api')
  health() {
    return {status:'UP'};
  }
}
// 