import { into } from '../../src/core';
import { fromArray } from '../../src/adapters';
import { CollectSink, ReduceSink } from '../../src/sinks';

describe('into', () => {
  it('should drive cursor into collect sink', () => {
    const data = [1, 2, 3, 4, 5];
    const cursor = fromArray(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should drive cursor into reduce sink', () => {
    const data = [1, 2, 3, 4, 5];
    const cursor = fromArray(data);
    const sink = new ReduceSink<number, number>((acc, val) => acc + val, 0);
    const result = into(cursor, sink);
    expect(result).toBe(15);
  });

  it('should handle early termination', () => {
    const data = [1, 2, 3, 4, 5];
    const cursor = fromArray(data);
    let processedCount = 0;
    const sink = {
      next(_value: number): boolean {
        processedCount++;
        // Stop after processing 2 elements (when count becomes 3, return false)
        if (processedCount > 2) {
          return false;
        }
        return true;
      },
      complete(): number {
        return processedCount;
      }
    };
    const result = into(cursor, sink);
    // When next returns false after processing 3rd element, count is 3
    // This verifies that early termination works - processing stops
    expect(result).toBe(3);
  });

  it('should work with empty cursor', () => {
    const data: number[] = [];
    const cursor = fromArray(data);
    const sink = new CollectSink<number>();
    const result = into(cursor, sink);
    expect(result).toEqual([]);
  });
});

