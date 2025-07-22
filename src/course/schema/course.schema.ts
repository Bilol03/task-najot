import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Course {
  // Course title string and required
  @Prop({ required: true })
  title: string;
  // Course description string and optional
  @Prop()
  description: string;
  // Course starting date Date and optional
  @Prop()
  startDate: Date;
  //  Course ending date Date and optional
  @Prop()
  endDate: Date;
}
