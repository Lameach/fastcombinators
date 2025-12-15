/**
 * flatMap benchmarks: nested arrays flattening.
 */

import { bench } from 'mitata';
import { flatMap } from '../../src/core';
import { collect } from '../../src/utils/helpers';
import { measureMemory, generateNestedArrays } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import { printSectionHeader } from '../utils/output';

/**
 * Runs flatMap benchmarks.
 */
export function runFlatMapBenchmarks(): void {
  printSectionHeader('flatMap: Nested arrays flattening');

  const nestedArrays = generateNestedArrays(10000);

  bench('flatMap: Native (flatMap)', () => {
    return measureMemory('flatMap: Native', () => {
      return nestedArrays.flatMap((x: number[]) => x);
    });
  });

  bench('flatMap: Lodash (flatMap)', () => {
    return measureMemory('flatMap: Lodash', () => {
      return _(nestedArrays).flatMap((x: number[]) => x).value();
    });
  });

  bench('flatMap: FastCombinators', () => {
    return measureMemory('flatMap: FastCombinators', () => {
      return collect(nestedArrays, flatMap((x: number[]) => x));
    });
  });

  bench('flatMap: Manual loop', () => {
    return measureMemory('flatMap: Manual loop', () => {
      const result: number[] = [];
      for (const arr of nestedArrays) {
        for (const item of arr) {
          result.push(item);
        }
      }
      return result;
    });
  });
}

