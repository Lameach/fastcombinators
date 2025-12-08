/**
 * Data consumer interface.
 * Encapsulates terminal operation state for efficient reduction.
 * 
 * @template TInput Input element type
 * @template TOutput Result type
 */
export interface Sink<TInput, TOutput> {
  /**
   * Processes the next element.
   * @param value - Element value
   * @returns true to continue, false to terminate early
   */
  next(value: TInput): boolean;

  /**
   * Completes processing and returns the result.
   * Called by the driver when source is exhausted or sink returned false.
   */
  complete(): TOutput;
}

/**
 * Transducer type - transforms a sink into another sink.
 * Used for building composable transformation pipelines.
 * 
 * @template TIn Input element type
 * @template TOut Output element type
 */
export type SinkFactory<TIn, TOut> = <TResult>(downstream: Sink<TOut, TResult>) => Sink<TIn, TResult>;