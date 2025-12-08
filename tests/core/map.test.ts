import { map, into } from '../../src/core';
import { fromArray } from '../../src/adapters';
import { CollectSink } from '../../src/sinks';

describe('map', () => {
  it('should transform numbers', () => {
    const data = [1, 2, 3, 4, 5];
    const double = (x: number) => x * 2;
    const cursor = fromArray(data);
    const sink = map(double)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it('should transform strings', () => {
    const data = ['a', 'b', 'c'];
    const toUpper = (x: string) => x.toUpperCase();
    const cursor = fromArray(data);
    const sink = map(toUpper)(new CollectSink<string>());
    const result = into(cursor, sink);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('should work with empty array', () => {
    const data: number[] = [];
    const double = (x: number) => x * 2;
    const cursor = fromArray(data);
    const sink = map(double)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });

  it('should handle type transformations', () => {
    const data = [1, 2, 3];
    const toString = (x: number) => x.toString();
    const cursor = fromArray(data);
    const sink = map(toString)(new CollectSink<string>());
    const result = into(cursor, sink);
    expect(result).toEqual(['1', '2', '3']);
    expect(typeof result[0]).toBe('string');
  });
});






