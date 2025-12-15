/**
 * Early termination benchmarks: take operations.
 */

import { bench } from 'mitata';
import { take } from '../../src/core';
import { collect } from '../../src/utils/helpers';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import { printSectionHeader } from '../utils/output';

/**
 * Runs early termination benchmarks.
 */
export function runEarlyTerminationBenchmarks(): void {
  printSectionHeader('Early Termination: take(1000) from 10M elements');

  const earlyTermData = generateArray(BENCHMARK_SIZES.xxlarge);
  const takeCount = 1000;

  bench('Early Termination: Native (slice)', () => {
    return measureMemory('Early Termination: Native', () => {
      return earlyTermData.slice(0, takeCount);
    });
  });

  bench('Early Termination: Lodash (take)', () => {
    return measureMemory('Early Termination: Lodash', () => {
      return _(earlyTermData).take(takeCount).value();
    });
  });

  bench('Early Termination: FastCombinators (take)', () => {
    return measureMemory('Early Termination: FastCombinators', () => {
      return collect(earlyTermData, take(takeCount));
    });
  });

  bench('Early Termination: Manual loop', () => {
    return measureMemory('Early Termination: Manual loop', () => {
      const result: number[] = [];
      for (let i = 0; i < earlyTermData.length && result.length < takeCount; i++) {
        result.push(earlyTermData[i]);
      }
      return result;
    });
  });
}

