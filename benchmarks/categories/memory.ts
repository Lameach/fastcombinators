/**
 * Memory benchmarks: large data processing.
 */

import { bench } from 'mitata';
import { map, filter } from '../../src/core';
import { collect, reduce } from '../../src/utils/helpers';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import * as R from 'ramda';
import { printSectionHeader } from '../utils/output';

/**
 * Runs memory benchmarks.
 */
export function runMemoryBenchmarks(): void {
  printSectionHeader('Memory: 10M elements processing');

  const memoryData = generateArray(BENCHMARK_SIZES.xxlarge);

  bench('Memory: Native (map+filter)', () => {
    return measureMemory('Memory: Native (map+filter)', () => {
      return memoryData.map(x => x * 2).filter(x => x % 2 === 0);
    });
  });

  bench('Memory: Lodash (map+filter)', () => {
    return measureMemory('Memory: Lodash (map+filter)', () => {
      return _(memoryData)
        .map((x: number) => x * 2)
        .filter((x: number) => x % 2 === 0)
        .value();
    });
  });

  bench('Memory: Ramda (map+filter)', () => {
    return measureMemory('Memory: Ramda (map+filter)', () => {
      return R.pipe(
        R.map<number, number>((x: number) => x * 2),
        R.filter<number>((x: number) => x % 2 === 0)
      )(memoryData);
    });
  });

  bench('Memory: FastCombinators (collect)', () => {
    return measureMemory('Memory: FastCombinators (collect)', () => {
      return collect(memoryData, map(x => x * 2), filter(x => x % 2 === 0));
    });
  });

  bench('Memory: FastCombinators (reduce)', () => {
    return measureMemory('Memory: FastCombinators (reduce)', () => {
      return reduce(memoryData, (acc, val) => acc + val, 0, map(x => x * 2), filter(x => x % 2 === 0));
    });
  });
}

