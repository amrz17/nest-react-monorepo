import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemsService } from './sale-order-items.service';

describe('SaleOrderItemsService', () => {
  let service: SaleOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleOrderItemsService],
    }).compile();

    service = module.get<SaleOrderItemsService>(SaleOrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
