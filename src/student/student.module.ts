import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { CourseModule } from 'src/course/course.module';


@Module({
  imports: [MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]), CourseModule],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
