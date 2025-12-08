import { Sink, SinkFactory } from "../interfaces/sink";

class SkipSink<T, TResult> implements Sink<T, TResult> {
  private skipped = 0;

  constructor(
    private readonly downstream: Sink<T, TResult>,
    private readonly n: number
  ) {}

  next(value: T): boolean {
    if (this.skipped < this.n) {
      this.skipped++;
      return true;
    }
    return this.downstream.next(value);
  }

  complete(): TResult {
    return this.downstream.complete();
  }
}

/**
 * Skips the first n elements, then passes through remaining elements.
 * 
 * @template T Element type
 * @param n - Number of elements to skip
 * @returns A transducer that skips first n elements
 * 
 * @example
 * ```typescript
 * const skip3 = skip(3);
 * ```
 */
export const skip = <T>(n: number): SinkFactory<T, T> => 
  (downstream) => new SkipSink(downstream, n);






