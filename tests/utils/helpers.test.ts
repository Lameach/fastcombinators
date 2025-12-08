import { collect, reduce } from '../../src/utils/helpers';
import { map, filter } from '../../src/core';

describe('helpers', () => {
  describe('collect', () => {
    it('should collect transformed elements', () => {
      const data = [1, 2, 3, 4, 5];
      const result = collect(data, map((x: number) => x * 2));
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    it('should collect filtered elements', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = collect(data, filter((x: number) => x % 2 === 0));
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    it('should compose multiple transducers', () => {
      const data = [1, 2, 3, 4, 5];
      const result = collect(
        data,
        map((x: number) => x * 2),
        filter((x: number) => x > 5)
      );
      expect(result).toEqual([6, 8, 10]);
    });
  });

  describe('reduce', () => {
    it('should reduce with transformation', () => {
      const data = [1, 2, 3, 4, 5];
      const result = reduce(
        data,
        (acc, val) => acc + val,
        0,
        map((x: number) => x * 2)
      );
      expect(result).toBe(30);
    });

    it('should reduce with filter', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = reduce(
        data,
        (acc, val) => acc + val,
        0,
        filter((x: number) => x % 2 === 0)
      );
      expect(result).toBe(30);
    });

    it('should compose multiple transducers', () => {
      const data = [1, 2, 3, 4, 5];
      const result = reduce(
        data,
        (acc, val) => acc + val,
        0,
        map((x: number) => x * 2),
        filter((x: number) => x > 5)
      );
      expect(result).toBe(24);
    });
  });
});






