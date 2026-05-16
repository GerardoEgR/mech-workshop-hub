import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(User)
      : this.usersRepository;

    const user = repo.create(createUserDto);
    return await repo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(User)
      : this.usersRepository;

    return await repo.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        isActive: true,
        role: true,
      },
    });
  }
}
