
import { Workshop } from 'src/workshop/entities/workshop.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
@Index(['workshopId', 'email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workshopId: string;

  @ManyToOne(() => Workshop, (workshop) => workshop.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workshopId' })
  workshop: Workshop;

  @Column({ length: 150 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;
}
