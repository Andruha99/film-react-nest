import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Film, FilmDocument } from '../films/entities/film.entity';

// export type FilmDocument = HydratedDocument<Film>;

// @Schema()
// export class Schedule {
//   @Prop({ required: true, type: String })
//   id: string;
//   @Prop({ required: true })
//   daytime: Date;
//   @Prop({ required: true, type: Number })
//   hall: number;
//   @Prop({ required: true, type: Number })
//   rows: number;
//   @Prop({ required: true, type: Number })
//   seats: number;
//   @Prop({ required: true, type: Number })
//   price: number;
//   @Prop({ required: true, type: [String] })
//   taken: string[];
// }

// export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

// @Schema()
// export class Film {
//   @Prop({ required: true, unique: true, type: String })
//   id: string;
//   @Prop({ required: true, type: Number })
//   rating: number;
//   @Prop({ required: true, type: String })
//   director: string;
//   @Prop({ required: true, type: [String] })
//   tags: string[];
//   @Prop({ required: true, type: String })
//   image: string;
//   @Prop({ required: true, type: String })
//   cover: string;
//   @Prop({ required: true, type: String })
//   title: string;
//   @Prop({ required: true, type: String })
//   about: string;
//   @Prop({ required: true, type: String })
//   description: string;
//   @Prop({ required: true, type: [ScheduleSchema] })
//   schedule: Schedule[];
// }

// export const FilmSchema = SchemaFactory.createForClass(Film);

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getAllFilms() {
    const films = await this.filmModel.find({});

    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmModel.findOne({ id });

    return film;
  }
}
