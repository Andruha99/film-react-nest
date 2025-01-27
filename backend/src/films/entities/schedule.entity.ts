import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Schedule {
  @Prop({ required: true, type: String })
  id: string;
  @Prop({ required: true })
  daytime: Date;
  @Prop({ required: true, type: Number })
  hall: number;
  @Prop({ required: true, type: Number })
  rows: number;
  @Prop({ required: true, type: Number })
  seats: number;
  @Prop({ required: true, type: Number })
  price: number;
  @Prop({ required: true, type: [String] })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
