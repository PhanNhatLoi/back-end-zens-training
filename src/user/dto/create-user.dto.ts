import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional()
  fullName: string;

  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  gender: string;

  @ApiPropertyOptional()
  dob: string;

  @IsEmpty()
  role: string;

  @IsEmpty()
  id: string;
}

export class ResponseUserDto extends CreateUserDto {
  @ApiProperty()
  role: string;

  @ApiProperty()
  id: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
