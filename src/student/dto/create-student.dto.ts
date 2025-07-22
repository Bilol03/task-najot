import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterStudentDto {
  @IsString()
  @ApiProperty({example: "student"})
  name: string;

  @IsEmail()
  @ApiProperty({example: 'email@example.com'})
  email: string;

  @IsString()
  @ApiProperty({example: 'passworD.123'})
  password: string;
}
