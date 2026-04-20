import { Controller, Get } from '@nestjs/common';


@Controller('posts')
export class HealthController {
  // constructor(private readonly appService: AppService) {}

  @Get('api')
  health() {
    return {status:'UP'};
  }
}
// 