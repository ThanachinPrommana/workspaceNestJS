import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AnonymousModule } from './anonymous/anonymous.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './config/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma/prisma.module';



@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    PrismaModule,
    
    
    JwtModule.registerAsync({
      useClass: JwtConfig,
      global: true
    }),AnonymousModule, UserModule, PrismaModule],
  controllers: [HealthController],
  providers: [
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    }
  ],
})
export class AppModule { }
