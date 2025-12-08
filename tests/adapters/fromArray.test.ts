import { fromArray } from '../../src/adapters';
import { into } from '../../src/core';
import { CollectSink } from '../../src/sinks';

describe('fromArray', () => {
  it('should create cursor from array', () => {
    const data = [1, 2, 3, 4, 5];
    const cursor = fromArray(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should work with array-like objects', () => {
    const data = { 0: 10, 1: 20, 2: 30, length: 3 };
    const cursor = fromArray(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([10, 20, 30]);
  });

  it('should work with TypedArray', () => {
    const data = new Int32Array([1, 2, 3, 4, 5]);
    const cursor = fromArray(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle empty arrays', () => {
    const data: number[] = [];
    const cursor = fromArray(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });
});






