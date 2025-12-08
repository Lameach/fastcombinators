import { map, filter, into } from '../../src/core';
import { fromArray } from '../../src/adapters';
import { CollectSink } from '../../src/sinks';
import { compose } from '../../src/utils/compose';

describe('composition', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const double = (x: number) => x * 2;
  const isEven = (x: number) => x % 2 === 0;

  it('should compose map -> filter', () => {
    const cursor = fromArray(data);
    const pipeline = compose(map(double), filter(isEven)) as <TResult>(sink: import('../../src/interfaces/sink').Sink<number, TResult>) => import('../../src/interfaces/sink').Sink<number, TResult>;
    const sink = pipeline(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });

  it('should compose filter -> map', () => {
    const cursor = fromArray(data);
    const pipeline = compose(filter(isEven), map(double)) as <TResult>(sink: import('../../src/interfaces/sink').Sink<number, TResult>) => import('../../src/interfaces/sink').Sink<number, TResult>;
    const sink = pipeline(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([4, 8, 12, 16, 20]);
  });

  it('should compose multiple transducers', () => {
    const cursor = fromArray(data);
    const addOne = (x: number) => x + 1;
    const pipeline = compose(map(double), filter(isEven), map(addOne)) as <TResult>(sink: import('../../src/interfaces/sink').Sink<number, TResult>) => import('../../src/interfaces/sink').Sink<number, TResult>;
    const sink = pipeline(new CollectSink<number>());
    const result = into(cursor, sink);
    expect(result).toEqual([3, 5, 7, 9, 11, 13, 15, 17, 19, 21]);
  });
});

