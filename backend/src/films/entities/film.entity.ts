import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schedule.entity';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop({ required: true, unique: true, type: String })
  id: string;
  @Prop({ required: true, type: Number })
  rating: number;
  @Prop({ required: true, type: String })
  director: string;
  @Prop({ required: true, type: [String] })
  tags: string[];
  @Prop({ required: true, type: String })
  image: string;
  @Prop({ required: true, type: String })
  cover: string;
  @Prop({ required: true, type: String })
  title: string;
  @Prop({ required: true, type: String })
  about: string;
  @Prop({ required: true, type: String })
  description: string;
  @Prop({ required: true, type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
