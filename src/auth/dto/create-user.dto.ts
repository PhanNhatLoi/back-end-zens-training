import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  address: string;

  gender: string;

  dob: string;
}
