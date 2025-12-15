/**
 * Common helper functions and constants for benchmarks.
 */

// Test functions
export const increment = (x: number) => x + 1;
export const isEven = (x: number) => x % 2 === 0;
export const sumReducer = (acc: number, val: number) => acc + val;

// Benchmark configuration
export const BENCHMARK_SIZES = {
  small: 1_000,
  medium: 10_000,
  large: 100_000,
  xlarge: 1_000_000,
  xxlarge: 10_000_000,
  xxxlarge: 100_000_000,
} as const;

// Common data generators
export function generateArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i);
}

export function generateNestedArrays(count: number, innerSize: number = 3): number[][] {
  return Array.from({ length: count }, () => 
    Array.from({ length: innerSize }, (_, i) => i + 1)
  );
}

