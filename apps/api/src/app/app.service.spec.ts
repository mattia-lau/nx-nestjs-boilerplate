import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello World"', () => {
      expect(service.getData()).toEqual({
        message: 'Hello World',
      });
    });
  });

  describe('sum', () => {
    it('should return 3', () => {
      expect(service.sum(1,2)).toEqual(3);
    });
  });
});
