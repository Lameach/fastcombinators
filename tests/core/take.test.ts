import { take, into } from '../../src/core';
import { fromArray } from '../../src/adapters';
import { CollectSink } from '../../src/sinks';

describe('take', () => {
  it('should take first n elements', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cursor = fromArray(data);
    const sink = take(3)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should take all elements if n > length', () => {
    const data = [1, 2, 3];
    const cursor = fromArray(data);
    const sink = take(10)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return empty array if n === 0', () => {
    const data = [1, 2, 3, 4, 5];
    const cursor = fromArray(data);
    const sink = take(0)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });

  it('should work with empty input', () => {
    const data: number[] = [];
    const cursor = fromArray(data);
    const sink = take(5)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });
});






