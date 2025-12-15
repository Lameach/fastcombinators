/**
 * Real-world use case benchmarks: retail discount calculation.
 */

import { bench } from 'mitata';
import { filter, map } from '../../src/core';
import { collect, reduce } from '../../src/utils/helpers';
import { measureMemory, BENCHMARK_SIZES } from '../utils';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _ = require('lodash');
import * as R from 'ramda';
import { printSectionHeader } from '../utils/output';

interface Customer {
  id: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastPurchaseDate: Date;
}

interface CustomerWithDiscount extends Customer {
  discount: number;
}

function generateCustomers(count: number): Customer[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    totalSpent: Math.random() * 10000,
    loyaltyPoints: Math.floor(Math.random() * 1000),
    lastPurchaseDate: new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000)
  }));
}

/**
 * Runs real-world benchmarks.
 */
export function runRealWorldBenchmarks(): void {
  printSectionHeader('Real-world: Retail discount calculation (1M customers)');

  const customers = generateCustomers(BENCHMARK_SIZES.xlarge);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  bench('Retail: Native approach', () => {
    return measureMemory('Retail: Native', () => {
      return customers
        .filter(c => c.lastPurchaseDate >= sixMonthsAgo)
        .map((c): CustomerWithDiscount => ({
          ...c,
          discount: Math.min(c.loyaltyPoints * 0.01 + c.totalSpent * 0.001, 0.2)
        }))
        .filter(c => c.discount > 0.05)
        .reduce((acc, c) => acc + c.discount * c.totalSpent, 0);
    });
  });

  bench('Retail: Lodash approach', () => {
    return measureMemory('Retail: Lodash', () => {
      return _(customers)
        .filter((c: Customer) => c.lastPurchaseDate >= sixMonthsAgo)
        .map((c: Customer): CustomerWithDiscount => ({
          ...c,
          discount: Math.min(c.loyaltyPoints * 0.01 + c.totalSpent * 0.001, 0.2)
        }))
        .filter((c: CustomerWithDiscount) => c.discount > 0.05)
        .reduce((acc: number, c: CustomerWithDiscount) => acc + c.discount * c.totalSpent, 0);
    });
  });

  bench('Retail: Ramda approach', () => {
    return measureMemory('Retail: Ramda', () => {
      return R.pipe(
        R.filter<Customer>((c: Customer) => c.lastPurchaseDate >= sixMonthsAgo),
        R.map<Customer, CustomerWithDiscount>((c: Customer): CustomerWithDiscount => ({
          ...c,
          discount: Math.min(c.loyaltyPoints * 0.01 + c.totalSpent * 0.001, 0.2)
        })),
        R.filter<CustomerWithDiscount>((c: CustomerWithDiscount) => c.discount > 0.05),
        R.reduce<CustomerWithDiscount, number>((acc: number, c: CustomerWithDiscount) => acc + c.discount * c.totalSpent, 0)
      )(customers);
    });
  });

  bench('Retail: FastCombinators (collect+reduce)', () => {
    return measureMemory('Retail: FastCombinators (collect+reduce)', () => {
      const filtered = collect(
        customers,
        filter(c => c.lastPurchaseDate >= sixMonthsAgo),
        map((c: Customer): CustomerWithDiscount => ({
          ...c,
          discount: Math.min(c.loyaltyPoints * 0.01 + c.totalSpent * 0.001, 0.2)
        })),
        filter((c: CustomerWithDiscount) => c.discount > 0.05)
      ) as CustomerWithDiscount[];
      return filtered.reduce((acc, c) => acc + c.discount * c.totalSpent, 0);
    });
  });

  bench('Retail: FastCombinators (reduce only)', () => {
    return measureMemory('Retail: FastCombinators (reduce only)', () => {
      return reduce(
        customers,
        (acc, c) => {
          if (c.lastPurchaseDate >= sixMonthsAgo) {
            const discount = Math.min(c.loyaltyPoints * 0.01 + c.totalSpent * 0.001, 0.2);
            if (discount > 0.05) {
              return acc + discount * c.totalSpent;
            }
          }
          return acc;
        },
        0
      );
    });
  });
}

