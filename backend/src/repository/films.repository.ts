import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;
}
