import { CollectSink } from '../../src/sinks';

describe('CollectSink', () => {
  it('should collect all elements', () => {
    const sink = new CollectSink<number>();
    sink.next(1);
    sink.next(2);
    sink.next(3);
    const result = sink.complete();
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return empty array for no elements', () => {
    const sink = new CollectSink<number>();
    const result = sink.complete();
    expect(result).toEqual([]);
  });

  it('should always return true from next', () => {
    const sink = new CollectSink<number>();
    expect(sink.next(1)).toBe(true);
    expect(sink.next(2)).toBe(true);
  });
});






