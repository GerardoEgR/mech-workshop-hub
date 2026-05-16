import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { Workshop } from './entities/workshop.entity';

@Injectable()
export class WorkshopService {

  constructor(
    @InjectRepository(Workshop)
    private readonly workshopRepository: Repository<Workshop>,
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(Workshop)
      : this.workshopRepository;

    const workshop = repo.create(createWorkshopDto);
    return await repo.save(workshop);
  }

}
