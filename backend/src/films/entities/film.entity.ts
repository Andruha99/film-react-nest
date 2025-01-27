import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.entity';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;
// export type FilmDocument = Film & Document<Types.ObjectId>;

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column()
  @IsString()
  tags: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
