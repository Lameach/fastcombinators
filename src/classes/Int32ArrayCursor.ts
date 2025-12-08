import { Cursor } from "../interfaces/cursor";

/**
 * Cursor implementation for Int32Array.
 * Optimized for numeric operations with zero-allocation iteration.
 */
export class Int32ArrayCursor implements Cursor<number> {
  private readonly src: Int32Array;
  private idx = -1;
  private readonly len: number;
  
  /**
   * Creates a new Int32ArrayCursor.
   * @param src - Int32Array source
   */
  constructor(src: Int32Array) {
    this.src = src;
    this.len = this.src.length;
  }

  /**
   * Advances the cursor to the next position.
   * @returns true if element is available, false if end reached
   */
  moveNext(): boolean {
    return ++this.idx < this.len;
  }

  /**
   * Returns the current element.
   * Should only be accessed after moveNext() returns true.
   * @returns Current element at cursor position
   */
  get current(): number {
    return this.src[this.idx];
  }
}