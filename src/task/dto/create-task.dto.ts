import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { TaskStatus } from '../schema/task.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'Title'})
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({example: "This is task"})
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiProperty({example: "pending"})
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
