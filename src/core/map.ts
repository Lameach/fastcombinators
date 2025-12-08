import { Sink, SinkFactory } from "../interfaces/sink";

class MapSink<TIn, TOut, TResult> implements Sink<TIn, TResult> {
  constructor(
    private readonly downstream: Sink<TOut, TResult>,
    private readonly fn: (v: TIn) => TOut
  ) {}

  next(value: TIn): boolean {
    return this.downstream.next(this.fn(value));
  }

  complete(): TResult {
    return this.downstream.complete();
  }
}

/**
 * Transforms each element using the provided function.
 * 
 * @template TIn Input element type
 * @template TOut Output element type
 * @param fn - Transformation function
 * @returns A transducer that applies the transformation
 * 
 * @example
 * ```typescript
 * const doubled = map((x: number) => x * 2);
 * ```
 */
export const map = <TIn, TOut>(fn: (v: TIn) => TOut): SinkFactory<TIn, TOut> => 
  (downstream) => new MapSink(downstream, fn);