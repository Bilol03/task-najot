import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class FindStudentDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'student' })
  email: string;
}
