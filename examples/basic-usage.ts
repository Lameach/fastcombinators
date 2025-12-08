/**
 * Basic usage examples for FastCombinators library.
 * Demonstrates the Cursor-Sink pattern for zero-allocation data processing.
 */

import { ArrayCursor } from "../src/classes/ArrayCursor";
import { CollectSink, ReduceSink } from "../src/sinks";
import { map, filter, into } from "../src/core";
import { compose } from "../src/utils/compose";
import type { SinkFactory } from "../src/interfaces/sink";

// Example 1: Simple filtering and collection into array
console.log("=== Example 1: Filtering even numbers ===");
const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cursor1 = new ArrayCursor(data1);
const pipeline1 = compose(
  filter((x: number) => x % 2 === 0)
);
const sink1 = pipeline1(new CollectSink<number>());
const result1 = into(cursor1, sink1);
console.log("Input data:", data1);
console.log("Result (even numbers):", result1);

// Example 2: Composition map -> filter
console.log("\n=== Example 2: map -> filter ===");
const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cursor2 = new ArrayCursor(data2);
const pipeline2 = compose(
  map((x: number) => x * 2),
  filter((x: number) => x % 4 === 0)
) as SinkFactory<number, number>;
const sink2 = pipeline2(new CollectSink<number>());
const result2 = into(cursor2, sink2);
console.log("Input data:", data2);
console.log("Result (doubled, multiples of 4):", result2);

// Example 3: Reduction (sum)
console.log("\n=== Example 3: Sum of numbers ===");
const data3 = [1, 2, 3, 4, 5];
const cursor3 = new ArrayCursor(data3);
const pipeline3 = compose(
  map((x: number) => x * 2)
);
const sink3 = pipeline3(new ReduceSink<number, number>(
  (acc, val) => acc + val,
  0
));
const result3 = into(cursor3, sink3);
console.log("Input data:", data3);
console.log("Sum of doubled:", result3);
console.log("Expected: 2 + 4 + 6 + 8 + 10 =", 30);

// Example 4: Complex pipeline
console.log("\n=== Example 4: Complex pipeline ===");
const data4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const cursor4 = new ArrayCursor(data4);
const pipeline4 = compose(
  filter((x: number) => x > 5),
  map((x: number) => x * x),
  filter((x: number) => x % 2 === 0)
) as SinkFactory<number, number>;
const sink4 = pipeline4(new CollectSink<number>());
const result4 = into(cursor4, sink4);
console.log("Input data:", data4);
console.log("Result:", result4);
console.log("Expected: [6,8,10,12,14] -> [36,64,100,144,196] -> [36,64,100,144,196]");

