import { flatMap, into } from '../../src/core';
import { fromArray } from '../../src/adapters';
import { CollectSink } from '../../src/sinks';

describe('flatMap', () => {
  it('should flatten mapped arrays', () => {
    const data = [1, 2, 3];
    const duplicate = (x: number) => [x, x * 2];
    const cursor = fromArray(data);
    const sink = flatMap(duplicate)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('should work with empty arrays in mapping', () => {
    const data = [1, 2, 3];
    const conditional = (x: number) => x % 2 === 0 ? [x] : [];
    const cursor = fromArray(data);
    const sink = flatMap(conditional)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([2]);
  });

  it('should work with empty input', () => {
    const data: number[] = [];
    const duplicate = (x: number) => [x, x * 2];
    const cursor = fromArray(data);
    const sink = flatMap(duplicate)(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });
});






