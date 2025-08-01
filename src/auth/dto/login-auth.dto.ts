import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example: "email@example.com"})
  email: string;

  @IsNotEmpty()
  @ApiProperty({example: "passworD.123"})
  password: string;
}
