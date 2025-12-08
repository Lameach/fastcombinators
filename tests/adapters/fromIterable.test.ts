import { fromIterable } from '../../src/adapters';
import { into } from '../../src/core';
import { CollectSink } from '../../src/sinks';

describe('fromIterable', () => {
  it('should create cursor from Set', () => {
    const data = new Set([1, 2, 3, 4, 5]);
    const cursor = fromIterable(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should create cursor from Map values', () => {
    const data = new Map([['a', 1], ['b', 2], ['c', 3]]);
    const cursor = fromIterable(data.values());
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should create cursor from generator', () => {
    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }
    const cursor = fromIterable(gen());
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty iterables', () => {
    const data = new Set<number>();
    const cursor = fromIterable(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });
});






