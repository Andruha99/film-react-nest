import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Film } from '../films/entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../films/entities/schedule.entity';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  // ],
  // controllers: [OrderController],
  // providers: [OrderService, FilmsRepository],

  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
