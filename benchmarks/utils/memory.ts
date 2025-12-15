/**
 * Memory measurement utilities for benchmarks.
 */

// GC helper (if available)
const gc = (global as any).gc;

// Memory metrics storage
export const memoryMetrics: Record<string, string> = {};

/**
 * Formats bytes into human-readable string.
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Measures memory usage of a function execution.
 * Measures BEFORE GC cleanup to capture actual allocation.
 * 
 * @param label - Label for the memory measurement
 * @param fn - Function to measure
 * @returns Result of the function execution
 */
export function measureMemory<T>(label: string, fn: () => T): T {
  if (gc) gc();
  const memBefore = process.memoryUsage();
  const result = fn();
  const memAfter = process.memoryUsage(); // Measure BEFORE GC cleanup
  if (gc) gc();
  
  const heapUsed = Math.max(0, memAfter.heapUsed - memBefore.heapUsed);
  memoryMetrics[label] = formatBytes(heapUsed);
  
  return result;
}

/**
 * Checks if GC is available.
 */
export function isGCAvailable(): boolean {
  return !!gc;
}

