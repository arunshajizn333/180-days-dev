/**
 * Namaste JS - JavaScript Functions Masterclass
 * Day / Topic: Essential JS Functions & Utility Implementations
 */

// 1. Pure Functions & Math Utilities
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const square = (x) => x * x;

// 2. Closure & State Encapsulation
function createCounter(initialValue = 0) {
  let count = initialValue;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => {
      count = initialValue;
      return count;
    },
  };
}

// 3. Higher-Order Functions & Memoization
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(`[Cache Hit] for args: ${key}`);
      return cache.get(key);
    }
    console.log(`[Computing] for args: ${key}`);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 4. Function Composition (Pipe)
const pipe = (...fns) => (initialValue) =>
  fns.reduce((acc, fn) => fn(acc), initialValue);

// 5. Asynchronous Function & Promise Handling
async function fetchSimulatedData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}`, status: 'Active', timestamp: new Date().toISOString() });
    }, 300);
  });
}

// 6. Main Execution Demo
async function main() {
  console.log('==============================================');
  console.log('🚀 Namaste JS: JavaScript Functions Demo');
  console.log('==============================================\n');

  // Counter Demo (Closure)
  console.log('--- 1. Counter (Closure) ---');
  const counter = createCounter(10);
  console.log('Initial Value:', counter.getValue());
  console.log('Incremented:', counter.increment());
  console.log('Incremented:', counter.increment());
  console.log('Decremented:', counter.decrement());
  console.log('Reset:', counter.reset());
  console.log('');

  // Memoization Demo
  console.log('--- 2. Memoization (Higher-Order Function) ---');
  const slowSquare = memoize((n) => {
    // Simulate heavy work
    let sum = 0;
    for (let i = 0; i < 1000000; i++) { sum += i; }
    return n * n;
  });

  console.log('Result 1:', slowSquare(5));
  console.log('Result 2:', slowSquare(5)); // Cached
  console.log('Result 3:', slowSquare(10));
  console.log('');

  // Composition Demo
  console.log('--- 3. Function Pipe / Composition ---');
  const addTenAndSquare = pipe(
    (n) => add(n, 10),
    square
  );
  console.log('pipe((x + 10)^2) for x = 5:', addTenAndSquare(5)); // (5+10)^2 = 225
  console.log('');

  // Async Demo
  console.log('--- 4. Async / Await Function ---');
  console.log('Fetching user data...');
  const user = await fetchSimulatedData(101);
  console.log('User Received:', user);

  console.log('\n==============================================');
  console.log('✅ Demo Execution Complete!');
  console.log('==============================================');
}

// Run the demo
main();
