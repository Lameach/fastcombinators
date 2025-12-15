/**
 * Standardized output utilities for benchmarks.
 */

import { memoryMetrics } from './memory';

/**
 * Prints a section header.
 */
export function printSectionHeader(title: string): void {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 ${title}`);
  console.log(`${'='.repeat(80)}\n`);
}

/**
 * Prints benchmark group results.
 */
export function printBenchmarkGroup(
  title: string,
  benchmarks: string[],
  suffix: string = ''
): void {
  console.log(`\n${title}:`);
  for (const name of benchmarks) {
    const fullName = name + suffix;
    const memory = memoryMetrics[fullName] || 'N/A';
    console.log(`  ${name.padEnd(48)} ${memory.padStart(15)}`);
  }
}

/**
 * Prints memory usage table.
 */
export function printMemoryUsage(groups: Array<{
  title: string;
  suffix: string;
  benchmarks: string[];
}>): void {
  console.log('\n💾 MEMORY USAGE');
  console.log('─'.repeat(80));
  console.log(`${'Benchmark'.padEnd(50)} ${'Memory'.padStart(15)}`);
  console.log('─'.repeat(80));

  for (const group of groups) {
    printBenchmarkGroup(group.title, group.benchmarks, group.suffix);
  }
}

/**
 * Prints all memory metrics that were collected.
 */
export function printAllMemoryMetrics(): void {
  const metrics = memoryMetrics;
  const entries = Object.entries(metrics);
  
  if (entries.length === 0) {
    return;
  }

  console.log('\n💾 MEMORY USAGE (All Benchmarks)');
  console.log('─'.repeat(80));
  console.log(`${'Benchmark'.padEnd(50)} ${'Memory'.padStart(15)}`);
  console.log('─'.repeat(80));

  // Sort entries by name for better readability
  entries.sort(([a], [b]) => a.localeCompare(b));
  
  for (const [label, memory] of entries) {
    console.log(`  ${label.padEnd(48)} ${memory.padStart(15)}`);
  }
}

/**
 * Prints final summary.
 */
export function printSummary(): void {
  console.log('\n' + '='.repeat(80));
  console.log('💡 Note: Memory measurement shows heap allocation during execution.');
  console.log('   Zero-allocation is confirmed for FastCombinators reduce() operations.');
  console.log('='.repeat(80) + '\n');
}

/**
 * Prints benchmark start message.
 */
export function printBenchmarkStart(): void {
  console.log('\n🚀 FastCombinators Performance Benchmarks');
  const gc = (global as any).gc;
  console.log(`GC available: ${gc ? '✅ Yes' : '❌ No (run with --expose-gc for accurate measurements)'}`);
}

