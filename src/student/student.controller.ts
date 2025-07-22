// === student/student.controller.ts ===
import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { RegisterStudentDto } from 'src/student/dto/create-student.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserInterface } from '../interfaces/user.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FindStudentDto } from './dto/find-student.dto';

@ApiBearerAuth('access-token')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('register')
  register(@Body() dto: RegisterStudentDto) {
    return this.studentService.registerStudent(dto);
  }

  @Post('courses/:courseId/register')
  @UseGuards(JwtAuthGuard)
  registerToCourse(
    @Param('courseId') courseId: string,
    studentDto: FindStudentDto
  ) {
    return this.studentService.registerToCourse(studentDto, courseId);
  }

  @Get(':id/courses')
  getCourses(@Param('id') id: string) {
    return this.studentService.getStudentCourses(id);
  }
}
