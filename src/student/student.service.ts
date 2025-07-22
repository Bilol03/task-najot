import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from 'src/course/schema/course.schema';
import { RegisterStudentDto } from './dto/create-student.dto';
import { FindStudentDto } from './dto/find-student.dto';
import { Student, StudentDocument } from './schema/student.schema';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/interfaces/user.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private jwtService: JwtService,
  ) {}

  async registerStudent(dto: RegisterStudentDto) {
    const student = await this.studentModel.findOne({ email: dto.email });
    if (student) throw new BadRequestException('Student Already exist');
    const hash = await bcrypt.hash(dto.password, 10);
    const newStudent = await this.studentModel.create({
      ...dto,
      password: hash,
    });

    const payload = {
      sub: newStudent._id,
      email: newStudent.email,
      role: 'student',
    };

    const token = this.jwtService.sign(payload);

    return {message: "Success", token, newStudent}
  }

  async registerToCourse(user: UserInterface, courseId: string) {
    const student = await this.studentModel.findOne({
      email: user.email,
    });
    console.log(student);

    const course = await this.courseModel.findById(courseId);

    if (!student || !course)
      throw new NotFoundException('Student or Course not found');

    if (student.registeredCourses.includes(course._id as Types.ObjectId)) {
      throw new BadRequestException('Already registered');
    }

    student.registeredCourses.push(course._id as Types.ObjectId);
    course.students.push(student._id as Types.ObjectId);

    await student.save();
    await course.save();

    return { message: 'Registered successfully' };
  }

  async getStudentCourses(id: string) {
    return await this.studentModel.findById(id).populate('registeredCourses').select('name email registeredCourses');;
  }
}
