/**
 * Main benchmark runner.
 * 
 * Orchestrates all benchmark categories and provides standardized output.
 * Supports selective execution of benchmark categories via command-line arguments.
 */

import { run } from 'mitata';
import { BENCHMARK_SIZES } from './utils';
import { printBenchmarkStart, printMemoryUsage, printSummary, printAllMemoryMetrics } from './utils/output';
import { parseArgs, printHelp, printCategories, type BenchmarkCategory } from './utils/cli';
import {
  runBasicBenchmarks,
} from './categories/basic';
import {
  runCompositionBenchmarks,
} from './categories/composition';
import {
  runEarlyTerminationBenchmarks,
} from './categories/early-termination';
import {
  runFlatMapBenchmarks,
} from './categories/flatmap';
import {
  runReduceBenchmarks,
} from './categories/reduce';
import {
  runMemoryBenchmarks,
} from './categories/memory';
import {
  runTypedArrayBenchmarks,
} from './categories/typed-array';
import {
  runRealWorldBenchmarks,
} from './categories/real-world';
import {
  runScalingBenchmarks,
} from './categories/scaling';
import {
  runCollectVsReduceBenchmarks,
} from './categories/collect-vs-reduce';
import {
  runCompositionOverheadBenchmarks,
} from './categories/composition-overhead';

// Define all benchmark categories
const benchmarkCategories: BenchmarkCategory[] = [
  {
    name: 'basic',
    description: 'Basic map, filter, reduce operations (Regular & Heavy)',
    run: () => {
      runBasicBenchmarks(BENCHMARK_SIZES.xlarge, ' (Regular)');
      runBasicBenchmarks(BENCHMARK_SIZES.xxxlarge, ' (Heavy)');
    }
  },
  {
    name: 'composition',
    description: 'Complex transducer composition chains',
    run: runCompositionBenchmarks
  },
  {
    name: 'early-termination',
    description: 'Early termination with take() operations',
    run: runEarlyTerminationBenchmarks
  },
  {
    name: 'flatmap',
    description: 'flatMap operations on nested arrays',
    run: runFlatMapBenchmarks
  },
  {
    name: 'reduce',
    description: 'Various reduce operations (sum, max, aggregation)',
    run: runReduceBenchmarks
  },
  {
    name: 'memory',
    description: 'Memory usage benchmarks for large datasets',
    run: runMemoryBenchmarks
  },
  {
    name: 'typed-array',
    description: 'TypedArray (Int32Array) processing benchmarks',
    run: runTypedArrayBenchmarks
  },
  {
    name: 'real-world',
    description: 'Real-world use case: retail discount calculation',
    run: runRealWorldBenchmarks
  },
  {
    name: 'scaling',
    description: 'Performance scaling across different data sizes',
    run: runScalingBenchmarks
  },
  {
    name: 'collect-vs-reduce',
    description: 'Comparison of collect() vs reduce() approaches',
    run: runCollectVsReduceBenchmarks
  },
  {
    name: 'composition-overhead',
    description: 'compose() vs manual composition overhead',
    run: runCompositionOverheadBenchmarks
  }
];

// Parse command-line arguments
const args = process.argv.slice(2);
const config = parseArgs(args);

// Handle help and list commands
if (config.help) {
  printHelp(benchmarkCategories);
  process.exit(0);
}

if (config.listOnly) {
  printCategories(benchmarkCategories);
  process.exit(0);
}

// Determine which categories to run
let categoriesToRun: BenchmarkCategory[];

if (config.categories.length === 0) {
  // Run all categories if none specified
  categoriesToRun = benchmarkCategories;
} else {
  // Run only specified categories
  const categoryMap = new Map(benchmarkCategories.map(cat => [cat.name, cat]));
  categoriesToRun = [];
  const invalidCategories: string[] = [];

  for (const categoryName of config.categories) {
    const category = categoryMap.get(categoryName);
    if (category) {
      categoriesToRun.push(category);
    } else {
      invalidCategories.push(categoryName);
    }
}

  if (invalidCategories.length > 0) {
    console.error(`\n❌ Error: Unknown categories: ${invalidCategories.join(', ')}\n`);
    console.log('Use --list to see all available categories.\n');
    process.exit(1);
  }
}

// Print start message
printBenchmarkStart();

// Run selected benchmark categories
console.log(`\n📋 Running ${categoriesToRun.length} benchmark category/categories:\n`);
categoriesToRun.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.name} - ${cat.description}`);
});
console.log();

// Execute all selected categories
categoriesToRun.forEach(cat => {
  cat.run();
});

// Run all benchmarks
run({
  percentiles: false,
}).then(() => {
  // Display results
  // Check if basic benchmarks were run
  const hasBasicBenchmarks = categoriesToRun.some(cat => cat.name === 'basic');
  
  if (hasBasicBenchmarks) {
    // Display structured results for basic benchmarks
    printMemoryUsage([
      {
        title: 'Regular Benchmarks (1M elements)',
        suffix: ' (Regular)',
        benchmarks: [
          'Native Array Methods',
          'Manual Loop (Optimal)',
          'Lodash',
          'Ramda',
          'FastCombinators: collect (low-level)',
          'FastCombinators: collect() helper',
          'FastCombinators: reduce (low-level)',
          'FastCombinators: reduce() helper',
          'Native Iterator (Generator)'
        ]
      },
      {
        title: 'Heavy Benchmarks (100M elements)',
        suffix: ' (Heavy)',
        benchmarks: [
          'Native Array Methods',
          'Manual Loop (Optimal)',
          'Lodash',
          'Ramda',
          'FastCombinators: collect (low-level)',
          'FastCombinators: collect() helper',
          'FastCombinators: reduce (low-level)',
          'FastCombinators: reduce() helper',
          'Native Iterator (Generator)'
        ]
      }
    ]);
  }
  
  // Always display all collected memory metrics
  printAllMemoryMetrics();

  printSummary();
});
