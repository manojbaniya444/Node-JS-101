const { Worker } = require("node:worker_threads");
const { performance } = require("node:perf_hooks");

// Benchmarking the performance of the prime number generator
// 1. Start: 100_000_000_000_000 Prime Count: 100 Threads: 6 Time: 855ms ( 8.5sec )
// 2. Start: 100_000_000_000_000 Prime Count: 200 Threads: 6 Time: 1600ms (1.6sec)
// 3: Start: 10_00_000_000_000_000 Prime Count: 200 Threads: 6 Time: 5000ms  ( 5sec)
// 4: Start: 10_00_000_000_000_000 Prime Count: 200 Threads: 7 Time: 4700ms (4.7sec)
// 5: Start: 10_00_000_000_000_000 Prime Count: 200 Threads: 2 Time: 10465ms (10sec)

// store all the prime numbers generated in this list
let primeResult = [];
// total number of threads to run
const NUM_OF_THREADS = 2;
// completed count
let completed = 0;
// number of prime numbers to generate
const PRIME_COUNT = 200;

const startTime = performance.now();

for (let i = 0; i < NUM_OF_THREADS; i++) {
  const worker = new Worker("./thread.js", {
    workerData: {
      //numbers of prime to generate in each thread
      count: PRIME_COUNT / NUM_OF_THREADS,
      // starting number to generate thread for each thread
      start: 10_00_000_000_000_000 + i * 300,
    },
  });

  const threadId = worker.threadId;
  console.log(`Thread ID: ${threadId}`);

  worker.on("message", (msg) => {
    primeResult = primeResult.concat(msg);
  });

  worker.on("error", (err) => {
    console.log("Error: ", err);
  });

  worker.on("exit", (code) => {
    console.log(
      `Thread  with thread id: ${threadId} exiting with code: ${code}`
    );

    completed++;

    if (completed === NUM_OF_THREADS) {
      const endTime = performance.now();
      console.log(`Execution time: ${endTime - startTime}ms`);
      let sortedResult = primeResult.sort();
      console.log(sortedResult);
    }

    if (code !== 0) {
      console.log("Thread stopped with error code ", code);
    }
  });
}
