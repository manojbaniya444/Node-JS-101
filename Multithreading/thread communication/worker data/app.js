const { Worker } = require("worker_threads");

new Worker("./thread.js", {
  workerData: {
    message: "Hello from the main thread as a message.",
  },
});
