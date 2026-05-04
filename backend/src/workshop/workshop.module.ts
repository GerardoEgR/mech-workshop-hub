import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workshop } from './entities/workshop.entity';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';

@Module({
  controllers: [WorkshopController],
  providers: [WorkshopService],
  imports: [TypeOrmModule.forFeature([Workshop])],
  exports: [WorkshopService],
})
export class WorkshopModule {}
