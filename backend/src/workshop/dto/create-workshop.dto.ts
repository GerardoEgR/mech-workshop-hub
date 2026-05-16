import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateWorkshopDto {
  @IsString()
  @MaxLength(150)
  workshopName: string;

  @IsEmail()
  @MaxLength(150)
  email: string;
}
