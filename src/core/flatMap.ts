import { Sink, SinkFactory } from "../interfaces/sink";

class FlatMapSink<TIn, TOut, TResult> implements Sink<TIn, TResult> {
  constructor(
    private readonly downstream: Sink<TOut, TResult>,
    private readonly fn: (v: TIn) => Iterable<TOut>
  ) {}

  next(value: TIn): boolean {
    const iterable = this.fn(value);
    for (const item of iterable) {
      const shouldContinue = this.downstream.next(item);
      if (!shouldContinue) {
        return false;
      }
    }
    return true;
  }

  complete(): TResult {
    return this.downstream.complete();
  }
}

/**
 * Maps each element to an iterable and flattens the results.
 * 
 * @template TIn Input element type
 * @template TOut Output element type
 * @param fn - Function that returns an iterable for each element
 * @returns A transducer that flattens mapped iterables
 * 
 * @example
 * ```typescript
 * const flatten = flatMap((x: number) => [x, x * 2]);
 * ```
 */
export const flatMap = <TIn, TOut>(fn: (v: TIn) => Iterable<TOut>): SinkFactory<TIn, TOut> => 
  (downstream) => new FlatMapSink(downstream, fn);






