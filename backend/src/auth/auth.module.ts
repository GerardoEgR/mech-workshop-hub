import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { WorkshopModule } from 'src/workshop/workshop.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, WorkshopModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
