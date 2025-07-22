import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

@Schema({ timestamps: true })
export class Task {
  // Task title string and required
  @Prop({ required: true })
  title: string;

  // Task description string
  @Prop()
  description: string;

  // Task status enum
  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  // Task deadline Date
  @Prop()
  dueDate: Date;

  // Task author. Relational
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
