/**
 * FastCombinators - High-performance functional combinator library for JavaScript/TypeScript.
 * 
 * Based on Cursor-Sink pattern for zero-allocation data stream processing.
 * 
 * @packageDocumentation
 */

// Interfaces
export type { Cursor } from "./interfaces/cursor";
export type { Sink, SinkFactory } from "./interfaces/sink";

// Cursors
export { ArrayCursor } from "./classes/ArrayCursor";
export { Int32ArrayCursor } from "./classes/Int32ArrayCursor";

// Sinks
export { ReduceSink } from "./sinks/ReduceSink";
export { CollectSink } from "./sinks/CollectSink";

// Combinators (transducers)
export { map } from "./core/map";
export { filter } from "./core/filter";
export { flatMap } from "./core/flatMap";
export { take } from "./core/take";
export { skip } from "./core/skip";

// Driver
export { into } from "./core/into";

// Adapters
export { fromArray } from "./adapters/fromArray";
export { fromIterable } from "./adapters/fromIterable";

// Utilities
export { compose } from "./utils/compose";
export { collect, reduce } from "./utils/helpers";

