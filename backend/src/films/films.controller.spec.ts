import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        allFilms: jest
          .fn()
          .mockResolvedValue([{ id: 'test_1' }, { id: 'test_2' }]),
        filmSchedule: jest.fn().mockResolvedValue([{ id: 'test_3' }]),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('.allFilms() should return all films', async () => {
    const allFilms = await controller.findAll();
    expect(allFilms).toEqual([{ id: 'test_1' }, { id: 'test_2' }]);
    expect(service.allFilms).toHaveBeenCalled();
  });

  it('.filmSchedule() should return film schedule', async () => {
    const id = 'test id 3';
    const film = await controller.find(id);
    expect(film).toEqual([{ id: 'test_3' }]);
    expect(service.filmSchedule).toHaveBeenCalledWith(id);
  });
});
