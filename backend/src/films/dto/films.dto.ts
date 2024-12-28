import { IsArray, IsNumber, IsString } from 'class-validator';

//TODO описать DTO для запросов к /films
export class ScheduleDto {
  @IsString()
  id: string;
  @IsString()
  daytime: Date;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

export class FilmDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsArray()
  schedule: ScheduleDto[];
}
