import { IsEmail, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";


export class RegisterDto {

  @IsString()
  @Length(3, 150)
  workshopName: string;

  @IsString()
  @Length(3, 150)
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a uppercase, lowercase letter and a number',
    })
  password: string;
}
