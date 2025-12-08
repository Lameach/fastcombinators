import { filter, into } from '../../src/core';
import { fromArray } from '../../src/adapters';
import { CollectSink } from '../../src/sinks';

describe('filter', () => {
  it('should filter even numbers', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const isEven = (x: number) => x % 2 === 0;
    const cursor = fromArray(data);
    const sink = filter(isEven)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it('should filter odd numbers', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const isOdd = (x: number) => x % 2 !== 0;
    const cursor = fromArray(data);
    const sink = filter(isOdd)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });

  it('should work with empty array', () => {
    const data: number[] = [];
    const isEven = (x: number) => x % 2 === 0;
    const cursor = fromArray(data);
    const sink = filter(isEven)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });

  it('should filter all elements when predicate is always true', () => {
    const data = [1, 2, 3, 4, 5];
    const alwaysTrue = () => true;
    const cursor = fromArray(data);
    const sink = filter(alwaysTrue)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should filter all elements when predicate is always false', () => {
    const data = [1, 2, 3, 4, 5];
    const alwaysFalse = () => false;
    const cursor = fromArray(data);
    const sink = filter(alwaysFalse)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });
});






