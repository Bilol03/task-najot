import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from 'src/student/student.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './schema/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService, MongooseModule],
})
export class CourseModule {}
