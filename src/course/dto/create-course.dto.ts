import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @ApiProperty({ example: 'title' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'description(optional)' })
  description?: string;

  startDate?: Date;
  endDate?: Date;
}
