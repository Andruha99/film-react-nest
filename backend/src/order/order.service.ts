import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: OrderDto) {
    for (const ticket of orderDto.tickets) {
      const { film, session, seat, row } = ticket;

      const currentFilm = await this.filmsRepository.getFilmSchedule(film);

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
      if (filmSchedule.taken.find((place) => place === takenPlace)) {
        throw new BadRequestException('Place has been booked');
      }

      filmSchedule.taken.push(takenPlace);

      await currentFilm.save();
    }

    // orderDto.tickets.forEach(async (ticket) => {
    //   const { film, session, seat, row } = ticket;

    //   const currentFilm = await this.filmsRepository.getFilmSchedule(film);

    //   if (!currentFilm) {
    //     throw new NotFoundException('This film not found');
    //   }

    //   const filmSchedule = currentFilm.schedule.find(
    //     (item) => item.id === session,
    //   );

    //   if (!filmSchedule) {
    //     throw new NotFoundException('Film not found on this time');
    //   }

    //   const takenPlace = `${row}:${seat}`;
    //   if (filmSchedule.taken.find((place) => place === takenPlace)) {
    //     throw new BadRequestException('Place has been booked');
    //   }

    //   filmSchedule.taken.push(takenPlace);

    //   await currentFilm.save();
    // });
    return {
      total: orderDto.tickets.length,
      items: orderDto.tickets,
    };
  }
}
