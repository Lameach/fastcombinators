/**
 * Composition overhead benchmarks: compose() vs manual composition.
 */

import { bench } from 'mitata';
import { ArrayCursor } from '../../src/classes/ArrayCursor';
import { CollectSink } from '../../src/sinks';
import { map, filter, take, into } from '../../src/core';
import { compose } from '../../src/utils/compose';
import type { Sink } from '../../src/interfaces/sink';
import { measureMemory, BENCHMARK_SIZES, generateArray } from '../utils';
import { printSectionHeader } from '../utils/output';

/**
 * Runs composition overhead benchmarks.
 */
export function runCompositionOverheadBenchmarks(): void {
  printSectionHeader('Composition: compose() vs manual composition');

  const composeData = generateArray(BENCHMARK_SIZES.xlarge);

  bench('Composition: Using compose()', () => {
    return measureMemory('Composition: compose()', () => {
      const cursor = new ArrayCursor(composeData);
      const pipeline = compose(
        map((x: number) => x * 2),
        filter((x: number) => x % 2 === 0),
        take(1000)
      ) as <TResult>(sink: Sink<number, TResult>) => Sink<number, TResult>;
      const sink = pipeline(new CollectSink<number>());
      return into(cursor, sink);
    });
  });

  bench('Composition: Manual composition', () => {
    return measureMemory('Composition: Manual', () => {
      const cursor = new ArrayCursor(composeData);
      const takeSink = take(1000)(new CollectSink<number>());
      const filterSink = filter((x: number) => x % 2 === 0)(takeSink);
      const mapSink = map((x: number) => x * 2)(filterSink);
      return into(cursor, mapSink);
    });
  });
}

