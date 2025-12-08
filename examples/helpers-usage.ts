/**
 * Examples of using simplified helper functions from FastCombinators.
 * Demonstrates a simple API without the need to manually create cursors and sinks.
 */

import { collect, reduce } from "../src/utils/helpers";
import { map, filter } from "../src/core";

// Example 1: Simple filtering and collection into array
console.log("=== Example 1: Filtering even numbers (helper) ===");
const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result1 = collect(data1, filter((x: number) => x % 2 === 0));
console.log("Input data:", data1);
console.log("Result (even numbers):", result1);

// Example 2: Composition map -> filter
console.log("\n=== Example 2: map -> filter (helper) ===");
const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result2 = collect(
  data2,
  map((x: number) => x * 2),
  filter((x: number) => x % 4 === 0)
);
console.log("Input data:", data2);
console.log("Result (doubled, multiples of 4):", result2);

// Example 3: Reduction (sum) with transducers
console.log("\n=== Example 3: Sum of numbers (helper) ===");
const data3 = [1, 2, 3, 4, 5];
const result3 = reduce(
  data3,
  (acc, val) => acc + val,
  0,
  map((x: number) => x * 2)
);
console.log("Input data:", data3);
console.log("Sum of doubled:", result3);
console.log("Expected: 2 + 4 + 6 + 8 + 10 =", 30);

// Example 4: Complex pipeline
console.log("\n=== Example 4: Complex pipeline (helper) ===");
const data4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const result4 = collect(
  data4,
  filter((x: number) => x > 5),
  map((x: number) => x * x),
  filter((x: number) => x % 2 === 0)
);
console.log("Input data:", data4);
console.log("Result:", result4);
console.log("Expected: [6,8,10,12,14] -> [36,64,100,144,196] -> [36,64,100,144,196]");

// Example 5: Reduction with multiple transducers
console.log("\n=== Example 5: Reduction with pipeline (helper) ===");
const data5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result5 = reduce(
  data5,
  (acc, val) => acc + val,
  0,
  map((x: number) => x + 1),
  filter((x: number) => x % 2 === 0)
);
console.log("Input data:", data5);
console.log("Sum (increment -> filter even):", result5);
console.log("Expected: [2,4,6,8,10,12] -> sum = 42");

