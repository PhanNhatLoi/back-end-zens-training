import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsStrongPassword()
  password?: string;

  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  dob?: string;

  @ApiPropertyOptional()
  refreshToken?: string;
}
