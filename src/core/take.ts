import { Sink, SinkFactory } from "../interfaces/sink";

class TakeSink<T, TResult> implements Sink<T, TResult> {
  private count = 0;

  constructor(
    private readonly downstream: Sink<T, TResult>,
    private readonly n: number
  ) {}

  next(value: T): boolean {
    if (this.count < this.n) {
      this.count++;
      return this.downstream.next(value);
    }
    return false;
  }

  complete(): TResult {
    return this.downstream.complete();
  }
}

/**
 * Takes only the first n elements, then terminates.
 * 
 * @template T Element type
 * @param n - Number of elements to take
 * @returns A transducer that takes first n elements
 * 
 * @example
 * ```typescript
 * const first3 = take(3);
 * ```
 */
export const take = <T>(n: number): SinkFactory<T, T> => 
  (downstream) => new TakeSink(downstream, n);






