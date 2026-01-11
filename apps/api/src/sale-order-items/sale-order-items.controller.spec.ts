import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemsController } from './sale-order-items.controller';

describe('SaleOrderItemsController', () => {
  let controller: SaleOrderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderItemsController],
    }).compile();

    controller = module.get<SaleOrderItemsController>(SaleOrderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
