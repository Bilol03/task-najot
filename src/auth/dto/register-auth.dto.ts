import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  name: string;

  @IsEmail()
  @ApiProperty({example: "email@example.com"})
  email: string;

  @MinLength(6)
  @ApiProperty({example: "passworD.123"})
  password: string;
}
