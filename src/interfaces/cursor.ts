/**
 * Lightweight abstraction for sequential data access.
 * Separates element availability check from element access to avoid allocations.
 * 
 * Unlike Iterator.next(), moveNext() returns a primitive boolean instead of an object,
 * enabling zero-allocation iteration in hot paths.
 * 
 * @template T Element type
 */
export interface Cursor<T> {
  /**
   * Advances the cursor to the next position.
   * @returns true if element is available, false if end reached
   */
  moveNext(): boolean;

  /**
   * Returns the current element.
   * Should only be accessed after moveNext() returns true.
   * Type contract guarantees T, but implementations may return undefined for invalid access.
   */
  readonly current: T;
}