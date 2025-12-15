/**
 * TypedArray benchmarks: Int32Array processing.
 */

import { bench } from 'mitata';
import { Int32ArrayCursor } from '../../src/classes/Int32ArrayCursor';
import { CollectSink } from '../../src/sinks';
import { map, into } from '../../src/core';
import { compose } from '../../src/utils/compose';
import { collect } from '../../src/utils/helpers';
import type { Sink } from '../../src/interfaces/sink';
import { measureMemory, BENCHMARK_SIZES } from '../utils';
import { printSectionHeader } from '../utils/output';

/**
 * Runs TypedArray benchmarks.
 */
export function runTypedArrayBenchmarks(): void {
  printSectionHeader('TypedArray: Int32Array processing');

  const typedArray = new Int32Array(BENCHMARK_SIZES.xxlarge);
  for (let i = 0; i < typedArray.length; i++) {
    typedArray[i] = i;
  }

  bench('TypedArray: Native Int32Array methods', () => {
    return measureMemory('TypedArray: Native Int32Array', () => {
      const doubled = new Int32Array(typedArray.length);
      for (let i = 0; i < typedArray.length; i++) {
        doubled[i] = typedArray[i] * 2;
      }
      return doubled;
    });
  });

  bench('TypedArray: FastCombinators (Int32ArrayCursor)', () => {
    return measureMemory('TypedArray: FastCombinators (Int32ArrayCursor)', () => {
      const cursor = new Int32ArrayCursor(typedArray);
      const pipeline = compose(
        map((x: number) => x * 2)
      ) as <TResult>(sink: Sink<number, TResult>) => Sink<number, TResult>;
      const sink = pipeline(new CollectSink<number>());
      return into(cursor, sink);
    });
  });

  bench('TypedArray: Regular Array conversion', () => {
    return measureMemory('TypedArray: Regular Array', () => {
      const arr = Array.from(typedArray);
      return collect(arr, map(x => x * 2));
    });
  });
}

