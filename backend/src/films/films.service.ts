import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async allFilms() {
    return this.filmsRepository.getAllFilms();
  }

  async filmSchedule(id: string) {
    const film = await this.filmsRepository.getFilmSchedule(id);

    return { total: film.schedule.length, items: film.schedule };
  }
}
