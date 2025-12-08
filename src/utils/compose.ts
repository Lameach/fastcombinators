/**
 * Function composition utility module.
 * 
 * Implements a strictly typed composition function that provides compile-time
 * type checking for function chains.
 */

/**
 * Composes functions from right to left.
 * The result of calling compose(f, g, h) is equivalent to (...args) => f(g(h(...args))).
 * 
 * @example
 * ```typescript
 * const add1 = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const composed = compose(double, add1);
 * // composed(5) === double(add1(5)) === 12
 * ```
 */

/**
 * Overload 1: Arity 0 (Identity function).
 * If no functions are provided, returns an identity function.
 * 
 * @template R Return type
 * @returns Identity function that returns its argument unchanged
 */
export function compose(): <R>(a: R) => R;

/**
 * Overload 2: Arity 1.
 * Returns the passed function unchanged, preserving its type.
 * 
 * @template F Function type
 * @param f - Function to return
 * @returns The same function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose<F extends (...args: any[]) => any>(f: F): F;

/**
 * Overload 3: Arity 2.
 * Data flow: A -> f1 -> T1 -> f2 -> R
 * 
 * @template A Input type
 * @template T1 Intermediate type
 * @template R Return type
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, R>(
    f2: (arg: T1) => R,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Overload 4: Arity 3.
 * Data flow: A -> f1 -> T1 -> f2 -> T2 -> f3 -> R
 * 
 * @template A Input type
 * @template T1 First intermediate type
 * @template T2 Second intermediate type
 * @template R Return type
 * @param f3 - Third function in the chain
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, T2, R>(
    f3: (arg: T2) => R,
    f2: (arg: T1) => T2,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Overload 5: Arity 4.
 * Data flow: A -> f1 -> T1 -> ... -> f4 -> R
 * 
 * @template A Input type
 * @template T1 First intermediate type
 * @template T2 Second intermediate type
 * @template T3 Third intermediate type
 * @template R Return type
 * @param f4 - Fourth function in the chain
 * @param f3 - Third function in the chain
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, T2, T3, R>(
    f4: (arg: T3) => R,
    f3: (arg: T2) => T3,
    f2: (arg: T1) => T2,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Overload 6: Arity 5.
 * 
 * @template A Input type
 * @template T1 First intermediate type
 * @template T2 Second intermediate type
 * @template T3 Third intermediate type
 * @template T4 Fourth intermediate type
 * @template R Return type
 * @param f5 - Fifth function in the chain
 * @param f4 - Fourth function in the chain
 * @param f3 - Third function in the chain
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, T2, T3, T4, R>(
    f5: (arg: T4) => R,
    f4: (arg: T3) => T4,
    f3: (arg: T2) => T3,
    f2: (arg: T1) => T2,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Overload 7: Arity 6.
 * 
 * @template A Input type
 * @template T1 First intermediate type
 * @template T2 Second intermediate type
 * @template T3 Third intermediate type
 * @template T4 Fourth intermediate type
 * @template T5 Fifth intermediate type
 * @template R Return type
 * @param f6 - Sixth function in the chain
 * @param f5 - Fifth function in the chain
 * @param f4 - Fourth function in the chain
 * @param f3 - Third function in the chain
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, T2, T3, T4, T5, R>(
    f6: (arg: T5) => R,
    f5: (arg: T4) => T5,
    f4: (arg: T3) => T4,
    f3: (arg: T2) => T3,
    f2: (arg: T1) => T2,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Overload 8: Arity 7.
 * 
 * @template A Input type
 * @template T1 First intermediate type
 * @template T2 Second intermediate type
 * @template T3 Third intermediate type
 * @template T4 Fourth intermediate type
 * @template T5 Fifth intermediate type
 * @template T6 Sixth intermediate type
 * @template R Return type
 * @param f7 - Seventh function in the chain
 * @param f6 - Sixth function in the chain
 * @param f5 - Fifth function in the chain
 * @param f4 - Fourth function in the chain
 * @param f3 - Third function in the chain
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, T2, T3, T4, T5, T6, R>(
    f7: (arg: T6) => R,
    f6: (arg: T5) => T6,
    f5: (arg: T4) => T5,
    f4: (arg: T3) => T4,
    f3: (arg: T2) => T3,
    f2: (arg: T1) => T2,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Overload 9: Arity 8.
 * 
 * @template A Input type
 * @template T1 First intermediate type
 * @template T2 Second intermediate type
 * @template T3 Third intermediate type
 * @template T4 Fourth intermediate type
 * @template T5 Fifth intermediate type
 * @template T6 Sixth intermediate type
 * @template T7 Seventh intermediate type
 * @template R Return type
 * @param f8 - Eighth function in the chain
 * @param f7 - Seventh function in the chain
 * @param f6 - Sixth function in the chain
 * @param f5 - Fifth function in the chain
 * @param f4 - Fourth function in the chain
 * @param f3 - Third function in the chain
 * @param f2 - Second function in the chain
 * @param f1 - First function in the chain
 * @returns Composed function
 */
export function compose<A, T1, T2, T3, T4, T5, T6, T7, R>(
    f8: (arg: T7) => R,
    f7: (arg: T6) => T7,
    f6: (arg: T5) => T6,
    f5: (arg: T4) => T5,
    f4: (arg: T3) => T4,
    f3: (arg: T2) => T3,
    f2: (arg: T1) => T2,
    f1: (arg: A) => T1
): (arg: A) => R;

/**
 * Fallback overload.
 * Used when the number of functions exceeds 8, or when TypeScript cannot infer types
 * (e.g., when working with an array of functions).
 * Returns a function that accepts any arguments and returns R.
 * 
 * @template R Return type
 * @param funcs - Array of functions to compose
 * @returns Composed function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose<R>(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => R;

/**
 * Implementation of the compose function.
 * This signature is hidden from API consumers and serves only for implementation logic.
 * Uses Function type internally, as type checks are already performed by overloads above.
 * 
 * @param funcs - Functions to compose
 * @returns Composed function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any {
    // Optimization for empty call
    if (funcs.length === 0) {
        return <T>(arg: T) => arg;
    }

    // Optimization for single function
    if (funcs.length === 1) {
        return funcs[0];
    }

    // Standard implementation via reduce.
    // For high-performance tasks, JS engines (V8) efficiently optimize
    // such structures under the condition of monomorphic function calls.
    return funcs.reduce(
        (a, b) => 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (...args: any[]) => 
                a(b(...args))
    );
}