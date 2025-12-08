import { Sink } from "../interfaces/sink";

/**
 * Sink that reduces elements to a single value.
 * Accumulator state is stored inside the sink for optimal performance.
 * 
 * @template T Input element type
 * @template R Result type
 */
export class ReduceSink<T, R> implements Sink<T, R> {
  /**
   * Creates a new ReduceSink.
   * @param reducer - Reduction function (accumulator, value) => new accumulator
   * @param acc - Initial accumulator value
   */
  constructor(
    private readonly reducer: (acc: R, val: T) => R,
    private acc: R
  ) {}

  /**
   * Processes the next element by applying the reducer function.
   * @param value - Element value
   * @returns Always returns true to continue processing
   */
  next(value: T): boolean {
    this.acc = this.reducer(this.acc, value);
    return true;
  }

  /**
   * Completes processing and returns the final accumulator value.
   * @returns Final reduction result
   */
  complete(): R {
    return this.acc;
  }
}

