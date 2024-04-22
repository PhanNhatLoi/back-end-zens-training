<<<<<<< Updated upstream
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Unique } from 'typeorm';
=======
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
>>>>>>> Stashed changes

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

export class LoginUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
