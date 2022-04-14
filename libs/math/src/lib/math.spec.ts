import { sum } from './math';

describe('Test', () => {
  it('sum', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
