import { Sink, SinkFactory } from "../interfaces/sink";

class FilterSink<TIn, TResult> implements Sink<TIn, TResult> {
  constructor(
    private readonly downstream: Sink<TIn, TResult>,
    private readonly predicate: (v: TIn) => boolean
  ) {}

  next(value: TIn): boolean {
    if (this.predicate(value)) {
      return this.downstream.next(value);
    }
    return true;
  }

  complete(): TResult {
    return this.downstream.complete();
  }
}

/**
 * Filters elements based on a predicate function.
 * 
 * @template TIn Element type
 * @param predicate - Function that returns true for elements to keep
 * @returns A transducer that filters elements
 * 
 * @example
 * ```typescript
 * const evens = filter((x: number) => x % 2 === 0);
 * ```
 */
export const filter = <TIn>(predicate: (v: TIn) => boolean): SinkFactory<TIn, TIn> => 
  (downstream) => new FilterSink(downstream, predicate);