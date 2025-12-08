import { Cursor } from "../interfaces/cursor";
import { Sink } from "../interfaces/sink";

/**
 * Drives data from a cursor into a sink.
 * This is the hot path of the library - optimized for zero-allocation iteration.
 * 
 * @template TInput Input element type
 * @template TResult Result type
 * @param source - Cursor providing data
 * @param sink - Sink consuming data
 * @returns Result from sink.complete()
 * 
 * @example
 * ```typescript
 * const cursor = new ArrayCursor([1, 2, 3]);
 * const sink = new CollectSink<number>();
 * const result = into(cursor, sink);
 * ```
 */
export function into<TInput, TResult>(
  source: Cursor<TInput>,
  sink: Sink<TInput, TResult>
): TResult {
  while (source.moveNext()) {
    const item = source.current;
    const shouldContinue = sink.next(item);
    
    if (!shouldContinue) {
      break;
    }
  }
  
  return sink.complete();
}

