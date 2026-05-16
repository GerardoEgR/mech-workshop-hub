import { IsEmail, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsUUID()
  workshopId: string;

  @IsString()
  @MaxLength(150)
  fullName: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(150)
  password: string;
}
