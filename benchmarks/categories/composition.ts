/**
 * Composition benchmarks: complex transducer chains.
 */

import { bench } from 'mitata';
import { ArrayCursor } from '../../src/classes/ArrayCursor';
import { CollectSink } from '../../src/sinks';
import { map, filter, take, into } from '../../src/core';
import { compose } from '../../src/utils/compose';
import { collect } from '../../src/utils/helpers';
import type { Sink } from '../../src/interfaces/sink';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import * as R from 'ramda';
import { printSectionHeader } from '../utils/output';

/**
 * Runs composition benchmarks.
 */
export function runCompositionBenchmarks(): void {
  printSectionHeader('Composition: map+filter+map+take');

  const compositionData = generateArray(BENCHMARK_SIZES.xlarge);
  const f1 = (x: number) => x * 2;
  const p = (x: number) => x > 100;
  const f2 = (x: number) => x + 10;
  const takeN = 5000;

  bench('Composition: Native (map+filter+map+slice)', () => {
    return measureMemory('Composition: Native', () => {
      return compositionData
        .map(f1)
        .filter(p)
        .map(f2)
        .slice(0, takeN);
    });
  });

  bench('Composition: Lodash (map+filter+map+take)', () => {
    return measureMemory('Composition: Lodash', () => {
      return _(compositionData)
        .map(f1)
        .filter(p)
        .map(f2)
        .take(takeN)
        .value();
    });
  });

  bench('Composition: Ramda (map+filter+map+take)', () => {
    return measureMemory('Composition: Ramda', () => {
      return R.pipe(
        R.map(f1),
        R.filter(p),
        R.map(f2),
        R.take(takeN)
      )(compositionData);
    });
  });

  bench('Composition: FastCombinators (collect)', () => {
    return measureMemory('Composition: FastCombinators (collect)', () => {
      return collect(compositionData, map(f1), filter(p), map(f2), take(takeN));
    });
  });

  bench('Composition: FastCombinators (low-level)', () => {
    return measureMemory('Composition: FastCombinators (low-level)', () => {
      const cursor = new ArrayCursor(compositionData);
      const pipeline = compose(
        map(f1),
        filter(p),
        map(f2),
        take(takeN)
      ) as <TResult>(sink: Sink<number, TResult>) => Sink<number, TResult>;
      const sink = pipeline(new CollectSink<number>());
      return into(cursor, sink);
    });
  });

  bench('Composition: Manual loop', () => {
    return measureMemory('Composition: Manual loop', () => {
      const result: number[] = [];
      for (let i = 0; i < compositionData.length && result.length < takeN; i++) {
        const x1 = f1(compositionData[i]);
        if (p(x1)) {
          const x2 = f2(x1);
          result.push(x2);
        }
      }
      return result;
    });
  });
}

