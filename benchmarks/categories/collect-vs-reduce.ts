/**
 * collect vs reduce comparison benchmarks.
 */

import { bench } from 'mitata';
import { map, filter } from '../../src/core';
import { collect, reduce } from '../../src/utils/helpers';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
import { printSectionHeader } from '../utils/output';

/**
 * Runs collect vs reduce comparison benchmarks.
 */
export function runCollectVsReduceBenchmarks(): void {
  printSectionHeader('collect vs reduce: Same operation');

  const collectVsReduceData = generateArray(5_000_000);

  bench('collect vs reduce: Using collect', () => {
    return measureMemory('collect vs reduce: collect', () => {
      const result = collect(collectVsReduceData, map(x => x * 2), filter(x => x % 2 === 0));
      return result.reduce((acc, val) => acc + val, 0);
    });
  });

  bench('collect vs reduce: Using reduce', () => {
    return measureMemory('collect vs reduce: reduce', () => {
      return reduce(collectVsReduceData, (acc, val) => acc + val, 0, map(x => x * 2), filter(x => x % 2 === 0));
    });
  });
}

