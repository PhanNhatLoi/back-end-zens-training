import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  fullName: string;

  address: string;

  gender: string;

  dob: string;
}
