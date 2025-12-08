import { ReduceSink } from '../../src/sinks';

describe('ReduceSink', () => {
  it('should reduce to sum', () => {
    const sink = new ReduceSink<number, number>((acc, val) => acc + val, 0);
    sink.next(1);
    sink.next(2);
    sink.next(3);
    const result = sink.complete();
    expect(result).toBe(6);
  });

  it('should reduce to product', () => {
    const sink = new ReduceSink<number, number>((acc, val) => acc * val, 1);
    sink.next(2);
    sink.next(3);
    sink.next(4);
    const result = sink.complete();
    expect(result).toBe(24);
  });

  it('should return initial value for no elements', () => {
    const sink = new ReduceSink<number, number>((acc, val) => acc + val, 42);
    const result = sink.complete();
    expect(result).toBe(42);
  });

  it('should always return true from next', () => {
    const sink = new ReduceSink<number, number>((acc, val) => acc + val, 0);
    expect(sink.next(1)).toBe(true);
    expect(sink.next(2)).toBe(true);
  });
});






