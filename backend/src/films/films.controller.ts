import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): string {
    return 'Этот метод возвращает список фильмов';
  }

  @Get(':id/schedule')
  find(@Param('id') id: string): string {
    return `Этот метод вернёт данные фильма с id ${id}`;
  }
}
