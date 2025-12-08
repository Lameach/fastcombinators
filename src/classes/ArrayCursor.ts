import { Cursor } from "../interfaces/cursor";

/**
 * Cursor implementation for ArrayLike objects (arrays, TypedArrays, etc.).
 * Uses indexed access for optimal V8 performance.
 * 
 * @template T Element type
 */
export class ArrayCursor<T> implements Cursor<T> {
  private readonly src: ArrayLike<T>;
  private readonly len: number;
  private idx: number = -1;

  /**
   * Creates a new ArrayCursor.
   * @param src - ArrayLike source (Array, TypedArray, etc.)
   */
  constructor(src: ArrayLike<T>) {
    this.src = src;
    this.len = src.length;
  }

  /**
   * Advances the cursor to the next position.
   * @returns true if element is available, false if end reached
   */
  moveNext(): boolean {
    this.idx++;
    return this.idx < this.len;
  }

  /**
   * Returns the current element.
   * Should only be accessed after moveNext() returns true.
   * @returns Current element at cursor position
   */
  get current(): T {
    return this.src[this.idx];
  }
}