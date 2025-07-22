import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Task {
  //Task title string and required
  @Prop({ required: true })
  title: string;

  //Task description string and optional
  @Prop()
  description: string;

  //Task status string and required, by default pending
  @Prop({ enum: ['pending', 'in-progress', 'done'], default: 'pending' })
  status: string;

  //Task deadline Date and optional
  @Prop()
  dueDate: Date;

  //Task title User and relational
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}
