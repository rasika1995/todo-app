import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          secret,
          signOptions: { algorithm: 'HS256' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
