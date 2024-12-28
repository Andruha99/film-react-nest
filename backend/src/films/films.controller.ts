import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll() {
    return this.filmsService.allFilms();
  }

  @Get(':id/schedule')
  find(@Param('id') id: string) {
    return this.filmsService.filmSchedule(id);
    // return `Этот метод вернёт данные фильма с id ${id}`;
  }
}
