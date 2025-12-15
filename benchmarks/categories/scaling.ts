/**
 * Scaling benchmarks: performance vs data size.
 */

import { bench } from 'mitata';
import { map, filter } from '../../src/core';
import { collect } from '../../src/utils/helpers';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
import { printSectionHeader } from '../utils/output';

/**
 * Runs scaling benchmarks.
 */
export function runScalingBenchmarks(): void {
  printSectionHeader('Scaling: Performance vs data size');

  const sizes = [
    BENCHMARK_SIZES.small,
    BENCHMARK_SIZES.medium,
    BENCHMARK_SIZES.large,
    BENCHMARK_SIZES.xlarge,
    BENCHMARK_SIZES.xxlarge
  ];

  for (const size of sizes) {
    const scalingData = generateArray(size);
    
    bench(`Scaling: Native (${size.toLocaleString()} elements)`, () => {
      return measureMemory(`Scaling: Native (${size})`, () => {
        return scalingData.map(x => x + 1).filter(x => x % 2 === 0);
      });
    });
    
    bench(`Scaling: FastCombinators (${size.toLocaleString()} elements)`, () => {
      return measureMemory(`Scaling: FastCombinators (${size})`, () => {
        return collect(scalingData, map(x => x + 1), filter(x => x % 2 === 0));
      });
    });
  }
}

