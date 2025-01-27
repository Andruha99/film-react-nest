import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
  ) {}

  async createOrder(orderDto: OrderDto) {
    orderDto.tickets.forEach(async (ticket) => {
      const { film, session, seat, row } = ticket;
      const currentFilm = await this.filmsRepository.findOne({
        where: { id: film },
        relations: { schedule: true },
      });

      if (!currentFilm) {
        throw new NotFoundException('This film not found');
      }

      const filmSchedule = currentFilm.schedule.find(
        (item) => item.id === session,
      );

      if (!filmSchedule) {
        throw new NotFoundException('Film not found on this time');
      }

      const takenPlace = `${row}:${seat}`;

      const isTaken = filmSchedule.taken?.split(',');

      if (isTaken.includes(takenPlace)) {
        throw new BadRequestException('Place has been booked');
      }

      filmSchedule.taken = filmSchedule.taken
        ? `${filmSchedule.taken},${takenPlace}`
        : takenPlace;
      await this.filmsRepository.save(currentFilm);
    });
    return {
      total: orderDto.tickets.length,
      items: orderDto.tickets,
    };
  }
}
