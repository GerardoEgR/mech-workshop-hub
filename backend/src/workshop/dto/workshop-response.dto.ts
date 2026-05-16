import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "src/users/dto/user-response.dto";

export class WorkshopResponseDto {
  @Expose()
  id: string;

  @Expose()
  workshopName: string;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => UserResponseDto)
  users: UserResponseDto[];
}
