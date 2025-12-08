/**
 * Simplified helper functions for convenient FastCombinators usage.
 * Hides cursor and sink creation details behind a simple API.
 */

import { fromArray } from "../adapters/fromArray";
import { CollectSink, ReduceSink } from "../sinks";
import { into } from "../core/into";
import { compose } from "./compose";
import type { SinkFactory } from "../interfaces/sink";

/**
 * Processes an array through transducers and collects results into a new array.
 * 
 * @template T Input element type
 * @param data - Input array or array-like object
 * @param transducers - Transducers to apply
 * @returns New array with processed elements
 * 
 * @example
 * ```typescript
 * const result = collect(
 *   [1, 2, 3, 4, 5],
 *   map(x => x * 2),
 *   filter(x => x > 5)
 * );
 * // result: [6, 8, 10]
 * ```
 */
export function collect<T>(
  data: ArrayLike<T> | T[],
  ...transducers: Array<SinkFactory<any, any>>
): T[] {
  const cursor = fromArray(data);
  const pipeline = compose(...transducers) as SinkFactory<T, T>;
  const sink = pipeline(new CollectSink<T>());
  return into(cursor, sink);
}

/**
 * Processes an array through transducers and reduces to a single value.
 * 
 * @template T Input element type
 * @template R Result type
 * @param data - Input array or array-like object
 * @param reducer - Reduction function (accumulator, value) => new accumulator
 * @param init - Initial accumulator value
 * @param transducers - Transducers to apply before reduction
 * @returns Reduction result
 * 
 * @example
 * ```typescript
 * const sum = reduce(
 *   [1, 2, 3, 4, 5],
 *   (acc, val) => acc + val,
 *   0,
 *   map(x => x * 2),
 *   filter(x => x > 5)
 * );
 * // sum: 6 + 8 + 10 = 24
 * ```
 */
export function reduce<T, R>(
  data: ArrayLike<T> | T[],
  reducer: (acc: R, val: T) => R,
  init: R,
  ...transducers: Array<SinkFactory<any, any>>
): R {
  const cursor = fromArray(data);
  const pipeline = compose(...transducers) as SinkFactory<T, T>;
  const sink = pipeline(new ReduceSink<T, R>(reducer, init));
  return into(cursor, sink);
}

