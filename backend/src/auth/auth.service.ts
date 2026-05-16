import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { WorkshopService } from 'src/workshop/workshop.service';
import { DataSource } from 'typeorm';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly workshopService: WorkshopService,
    private readonly dataSource: DataSource,
  ) {}

  async register(registerDto: RegisterDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { workshopName, fullName, email, password } = registerDto;

      const existingUser = await this.usersService.findOneByEmail(email, queryRunner.manager);
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const workshop = await this.workshopService.create(
        { workshopName, email },
        queryRunner.manager,
      );

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.usersService.create(
        { workshopId: workshop.id, fullName, email, password: hashedPassword },
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();

      return plainToInstance(
        RegisterResponseDto,
        {
          workshop: {
            ...workshop,
            users: [user],
          }
        }, {
        excludeExtraneousValues: true,
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDbErrors(error);
    } finally {
      await queryRunner.release();
    }
  }

  private handleDbErrors(error: any): never {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const dbErrorCode = error as { code?: string };

      if (dbErrorCode.code === '23505') throw new BadRequestException('El usuario ya existe');
    }
    console.log(error)
    throw new InternalServerErrorException('Error inesperado, revisar logs');
  }

}
