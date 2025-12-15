/**
 * Basic benchmarks: map, filter, reduce operations.
 */

import { bench } from 'mitata';
import { ArrayCursor } from '../../src/classes/ArrayCursor';
import { CollectSink, ReduceSink } from '../../src/sinks';
import { map, filter, into } from '../../src/core';
import { compose } from '../../src/utils/compose';
import { collect, reduce } from '../../src/utils/helpers';
import type { Sink } from '../../src/interfaces/sink';
import { measureMemory, BENCHMARK_SIZES, increment, isEven, sumReducer, generateArray } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import * as R from 'ramda';
import { printSectionHeader } from '../utils/output';

/**
 * Runs basic benchmarks for a given size.
 */
export function runBasicBenchmarks(size: number, suffix: string): void {
  const data = generateArray(size);
  
  printSectionHeader(`${suffix}: Processing ${size.toLocaleString()} elements\nPipeline: map(x => x + 1) -> filter(x % 2 === 0) -> reduce(sum)`);

  // 1. Native Array Methods
  bench(`Native Array Methods${suffix}`, () => {
    return measureMemory(`Native Array Methods${suffix}`, () => {
      return data
        .map(increment)
        .filter(isEven)
        .reduce(sumReducer, 0);
    });
  });

  // 2. Manual Loop (Optimal baseline)
  bench(`Manual Loop (Optimal)${suffix}`, () => {
    return measureMemory(`Manual Loop (Optimal)${suffix}`, () => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const incremented = increment(data[i]);
        if (isEven(incremented)) {
          sum = sumReducer(sum, incremented);
        }
      }
      return sum;
    });
  });

  // 3. Lodash
  bench(`Lodash${suffix}`, () => {
    return measureMemory(`Lodash${suffix}`, () => {
      return _(data)
        .map(increment)
        .filter(isEven)
        .reduce(sumReducer, 0);
    });
  });

  // 4. Ramda
  bench(`Ramda${suffix}`, () => {
    return measureMemory(`Ramda${suffix}`, () => {
      return R.pipe(
        R.map(increment),
        R.filter(isEven),
        R.reduce(sumReducer, 0)
      )(data);
    });
  });

  // 5. FastCombinators: collect (low-level API)
  bench(`FastCombinators: collect (low-level)${suffix}`, () => {
    return measureMemory(`FastCombinators: collect (low-level)${suffix}`, () => {
      const cursor = new ArrayCursor(data);
      const pipeline = compose(
        map(increment),
        filter(isEven)
      ) as <TResult>(sink: Sink<number, TResult>) => Sink<number, TResult>;
      const sink = pipeline(new CollectSink<number>());
      const collected = into(cursor, sink);
      return collected.reduce(sumReducer, 0);
    });
  });

  // 6. FastCombinators: collect() helper
  bench(`FastCombinators: collect() helper${suffix}`, () => {
    return measureMemory(`FastCombinators: collect() helper${suffix}`, () => {
      const collected = collect(data, map(increment), filter(isEven));
      return collected.reduce(sumReducer, 0);
    });
  });

  // 7. FastCombinators: reduce (low-level API)
  bench(`FastCombinators: reduce (low-level)${suffix}`, () => {
    return measureMemory(`FastCombinators: reduce (low-level)${suffix}`, () => {
      const cursor = new ArrayCursor(data);
      const pipeline = compose(
        map(increment),
        filter(isEven)
      ) as <TResult>(sink: Sink<number, TResult>) => Sink<number, TResult>;
      const sink = pipeline(new ReduceSink<number, number>(sumReducer, 0));
      return into(cursor, sink);
    });
  });

  // 8. FastCombinators: reduce() helper
  bench(`FastCombinators: reduce() helper${suffix}`, () => {
    return measureMemory(`FastCombinators: reduce() helper${suffix}`, () => {
      return reduce(data, sumReducer, 0, map(increment), filter(isEven));
    });
  });

  // 9. Native Iterator (Generator)
  bench(`Native Iterator (Generator)${suffix}`, () => {
    return measureMemory(`Native Iterator (Generator)${suffix}`, () => {
      function* process(data: number[]) {
        for (const x of data) {
          const incremented = increment(x);
          if (isEven(incremented)) {
            yield incremented;
          }
        }
      }
      
      let sum = 0;
      for (const x of process(data)) {
        sum = sumReducer(sum, x);
      }
      return sum;
    });
  });
}

