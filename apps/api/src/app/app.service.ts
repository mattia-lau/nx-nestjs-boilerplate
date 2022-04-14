import { Injectable } from '@nestjs/common';
import { sum } from '@nx-nestjs-starter/math';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello World' };
  }

  sum(a: number, b: number) {
    return sum(a, b);
  }
}
