import { ArrayCursor } from "../classes/ArrayCursor";
import type { Cursor } from "../interfaces/cursor";

/**
 * Creates a cursor from an array or array-like object.
 * 
 * @template T Element type
 * @param data - Array or array-like source
 * @returns Cursor for the array
 * 
 * @example
 * ```typescript
 * const cursor = fromArray([1, 2, 3, 4, 5]);
 * ```
 */
export function fromArray<T>(data: ArrayLike<T> | T[]): Cursor<T> {
  return new ArrayCursor(data);
}






