import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from 'src/course/course.module';
import { Student, StudentSchema } from './schema/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import {config} from 'dotenv'
config()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    CourseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    forwardRef(() => CourseModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
