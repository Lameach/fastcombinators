/**
 * Reduce benchmarks: various reduction operations.
 */

import { bench } from 'mitata';
import { reduce } from '../../src/utils/helpers';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import * as R from 'ramda';
import { printSectionHeader } from '../utils/output';

/**
 * Runs reduce benchmarks.
 */
export function runReduceBenchmarks(): void {
  printSectionHeader('Reduce: Various operations (10M elements)');

  const reduceData = generateArray(BENCHMARK_SIZES.xxlarge);

  // Sum
  bench('Reduce: Sum (Native)', () => {
    return measureMemory('Reduce: Sum (Native)', () => {
      return reduceData.reduce((acc, val) => acc + val, 0);
    });
  });

  bench('Reduce: Sum (Lodash)', () => {
    return measureMemory('Reduce: Sum (Lodash)', () => {
      return _(reduceData).reduce((acc: number, val: number) => acc + val, 0);
    });
  });

  bench('Reduce: Sum (Ramda)', () => {
    return measureMemory('Reduce: Sum (Ramda)', () => {
      return R.reduce((acc: number, val: number) => acc + val, 0, reduceData);
    });
  });

  bench('Reduce: Sum (FastCombinators)', () => {
    return measureMemory('Reduce: Sum (FastCombinators)', () => {
      return reduce(reduceData, (acc, val) => acc + val, 0);
    });
  });

  // Max
  bench('Reduce: Max (Native)', () => {
    return measureMemory('Reduce: Max (Native)', () => {
      return reduceData.reduce((acc, val) => Math.max(acc, val), -Infinity);
    });
  });

  bench('Reduce: Max (Lodash)', () => {
    return measureMemory('Reduce: Max (Lodash)', () => {
      return _(reduceData).reduce((acc: number, val: number) => Math.max(acc, val), -Infinity);
    });
  });

  bench('Reduce: Max (Ramda)', () => {
    return measureMemory('Reduce: Max (Ramda)', () => {
      return R.reduce((acc: number, val: number) => Math.max(acc, val), -Infinity, reduceData);
    });
  });

  bench('Reduce: Max (FastCombinators)', () => {
    return measureMemory('Reduce: Max (FastCombinators)', () => {
      return reduce(reduceData, (acc, val) => Math.max(acc, val), -Infinity);
    });
  });

  // Complex aggregation: Group by and count
  interface Item {
    category: string;
    value: number;
  }

  const complexData: Item[] = Array.from({ length: BENCHMARK_SIZES.xlarge }, (_, i) => ({
    category: `cat${i % 10}`,
    value: i
  }));

  bench('Reduce: Complex Aggregation (Native)', () => {
    return measureMemory('Reduce: Complex Aggregation (Native)', () => {
      return complexData.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = { count: 0, sum: 0 };
        }
        acc[item.category].count++;
        acc[item.category].sum += item.value;
        return acc;
      }, {} as Record<string, { count: number; sum: number }>);
    });
  });

  bench('Reduce: Complex Aggregation (Lodash)', () => {
    return measureMemory('Reduce: Complex Aggregation (Lodash)', () => {
      return _(complexData).reduce((acc: Record<string, { count: number; sum: number }>, item: Item) => {
        if (!acc[item.category]) {
          acc[item.category] = { count: 0, sum: 0 };
        }
        acc[item.category].count++;
        acc[item.category].sum += item.value;
        return acc;
      }, {} as Record<string, { count: number; sum: number }>);
    });
  });

  bench('Reduce: Complex Aggregation (Ramda)', () => {
    return measureMemory('Reduce: Complex Aggregation (Ramda)', () => {
      return R.reduce(
        (acc: Record<string, { count: number; sum: number }>, item: Item) => {
          if (!acc[item.category]) {
            acc[item.category] = { count: 0, sum: 0 };
          }
          acc[item.category].count++;
          acc[item.category].sum += item.value;
          return acc;
        },
        {} as Record<string, { count: number; sum: number }>,
        complexData
      );
    });
  });

  bench('Reduce: Complex Aggregation (FastCombinators)', () => {
    return measureMemory('Reduce: Complex Aggregation (FastCombinators)', () => {
      return reduce(
        complexData,
        (acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = { count: 0, sum: 0 };
          }
          acc[item.category].count++;
          acc[item.category].sum += item.value;
          return acc;
        },
        {} as Record<string, { count: number; sum: number }>
      );
    });
  });
}

