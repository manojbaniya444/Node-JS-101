const { Worker } = require("node:worker_threads");
const { performance } = require("node:perf_hooks");
const { error } = require("node:console");

process.env.UV_THREADPOOL_SIZE = 4;
console.log("Threadpool thread count: ", process.env.UV_THREADPOOL_SIZE);

// BENCHMARKING:
// Thread count: 1 Iteration: 100_000 Time: 115300ms (115 seconds)
// Thread count: 2 Iteration: 100_000 Time: 62000ms (62 seconds)
// Thread count: 7 Iteration: 100_000 Time: 20000ms (20 seconds) with async Time: 39000ms (39 seconds)

const NUM_THREADS = 7;
let completed = 0;
// count for how many times to run compress operation
const count = 100_000;

for (let i = 0; i < NUM_THREADS; i++) {
  const start = performance.now();

  // create a worker
  const worker = new Worker("./thread-async.js", {
    workerData: {
      count: count / NUM_THREADS,
    },
  });

  const threaadId = worker.threadId;
  console.log(`Thread ${threaadId} started`);

  worker.on("message", (msg) => {});

  worker.on("error", (error) => {
    console.log("Error worker thread", error);
  });

  worker.on("exit", () => {
    console.log(
      `Thread ${threaadId} finished in ${performance.now() - start}ms`
    );
    completed++;
    if (completed === NUM_THREADS) {
      console.log(`All threads finished in ${performance.now() - start}ms`);
    }
  });
}
