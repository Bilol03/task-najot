import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Course } from "src/course/schema/course.schema";
import { User } from "src/users/schemas/user.schema";

@Schema()
export class Student {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  registeredCourses: Course[];
}
