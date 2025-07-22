import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  // User name string and required
  @Prop({ required: true })
  name: string;

  // User email string and required, unique
  @Prop({ required: true, unique: true })
  email: string;

  // User password string and required
  @Prop({ required: true })
  password: string;

  // User role string and required by default student
  @Prop({ enum: ['admin', 'student'], default: 'student' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
