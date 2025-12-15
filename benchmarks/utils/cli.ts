/**
 * Command-line interface utilities for benchmarks.
 */

export interface BenchmarkCategory {
  name: string;
  description: string;
  run: () => void;
}

export interface BenchmarkConfig {
  categories: string[];
  listOnly: boolean;
  help: boolean;
}

/**
 * Parses command-line arguments.
 */
export function parseArgs(args: string[]): BenchmarkConfig {
  const config: BenchmarkConfig = {
    categories: [],
    listOnly: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      config.help = true;
    } else if (arg === '--list' || arg === '-l') {
      config.listOnly = true;
    } else if (arg === '--category' || arg === '-c') {
      if (i + 1 < args.length) {
        config.categories.push(args[++i]);
      }
    } else if (!arg.startsWith('-')) {
      // Treat as category name if it doesn't start with -
      config.categories.push(arg);
    }
  }

  return config;
}

/**
 * Prints help message.
 */
export function printHelp(categories: BenchmarkCategory[]): void {
  console.log('\n📊 FastCombinators Benchmark Runner\n');
  console.log('Usage:');
  console.log('  npm run bench [options] [categories...]\n');
  console.log('Options:');
  console.log('  --help, -h          Show this help message');
  console.log('  --list, -l          List all available categories');
  console.log('  --category, -c      Specify category to run (can be used multiple times)');
  console.log('  [categories...]     Run specific categories by name\n');
  console.log('Available categories:');
  categories.forEach(cat => {
    console.log(`  ${cat.name.padEnd(25)} ${cat.description}`);
  });
  console.log('\nExamples:');
  console.log('  npm run bench                    # Run all benchmarks');
  console.log('  npm run bench basic              # Run only basic benchmarks');
  console.log('  npm run bench basic composition  # Run basic and composition');
  console.log('  npm run bench --list             # List all categories');
  console.log('  npm run bench --help             # Show this help\n');
}

/**
 * Prints list of available categories.
 */
export function printCategories(categories: BenchmarkCategory[]): void {
  console.log('\n📊 Available Benchmark Categories:\n');
  categories.forEach((cat, index) => {
    console.log(`${(index + 1).toString().padStart(2)}. ${cat.name.padEnd(25)} ${cat.description}`);
  });
  console.log();
}

