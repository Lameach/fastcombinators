import { Sink } from "../interfaces/sink";

/**
 * Sink that collects all elements into an array.
 * Uses native array push - V8 optimizes array growth automatically.
 * 
 * @template T Element type
 */
export class CollectSink<T> implements Sink<T, T[]> {
  private readonly result: T[] = [];

  /**
   * Processes the next element by adding it to the result array.
   * @param value - Element value
   * @returns Always returns true to continue processing
   */
  next(value: T): boolean {
    this.result.push(value);
    return true;
  }

  /**
   * Completes processing and returns the collected array.
   * @returns Array of all collected elements
   */
  complete(): T[] {
    return this.result;
  }
}

