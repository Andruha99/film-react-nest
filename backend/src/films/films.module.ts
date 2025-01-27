import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  // ],
  // controllers: [FilmsController],
  // providers: [FilmsService, FilmsRepository],
  // exports: [FilmsRepository],

  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
