import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
          email: 'test@test.by',
          phone: '88005553535',
          tickets: [
            {
              film: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
              session: 'eed1469f-c95e-428a-870d-13cbfe4ac2ac',
              daytime: '2024-06-30T13:00:53.000Z',
              row: 1,
              seat: 1,
              price: 350,
            },
          ],
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('.createOrder() should create an order', async () => {
    const order = {
      email: 'test@test.by',
      phone: '88005553535',
      tickets: [
        {
          film: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
          session: 'eed1469f-c95e-428a-870d-13cbfe4ac2ac',
          daytime: '2024-06-30T13:00:53.000Z',
          row: 1,
          seat: 1,
          price: 350,
        },
      ],
    };

    const newOrder = await controller.create(order);
    expect(newOrder).toEqual(order);
    expect(service.createOrder).toHaveBeenCalledWith(order);
  });
});
