import type { Cursor } from "../interfaces/cursor";

/**
 * Cursor implementation for any Iterable.
 * Converts standard iterables to cursor interface.
 */
class IterableCursor<T> implements Cursor<T> {
  private iterator: Iterator<T>;
  private currentValue?: T;
  private done = false;
  
  /**
   * Creates a new IterableCursor.
   * @param src - Iterable source
   */
  constructor(src: Iterable<T>) {
    this.iterator = src[Symbol.iterator]();
  }
  
  /**
   * Advances the cursor to the next position.
   * @returns true if element is available, false if end reached
   */
  moveNext(): boolean {
    const result = this.iterator.next();
    this.done = result.done ?? false;
    this.currentValue = result.value;
    return !this.done;
  }
  
  /**
   * Returns the current element.
   * Should only be accessed after moveNext() returns true.
   * @returns Current element at cursor position
   */
  get current(): T {
    return this.currentValue!;
  }
}

/**
 * Creates a cursor from any iterable object.
 * 
 * @template T Element type
 * @param data - Iterable source (Array, Set, Map, Generator, etc.)
 * @returns Cursor for the iterable
 * 
 * @example
 * ```typescript
 * const cursor = fromIterable(new Set([1, 2, 3]));
 * ```
 */
export function fromIterable<T>(data: Iterable<T>): Cursor<T> {
  return new IterableCursor(data);
}






