import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}

  async allFilms(): Promise<{ total: number; items: Film[] }> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({
        relations: {
          schedule: true,
        },
      }),
    ]);

    return { total, items };
  }

  async filmSchedule(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });

    return { total: film.schedule.length, items: film.schedule };
  }
}
