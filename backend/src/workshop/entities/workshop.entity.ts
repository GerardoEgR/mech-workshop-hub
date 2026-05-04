import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('workshops')
export class Workshop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  workshopName: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.workshop)
  users: User[];
}
