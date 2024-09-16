const { Worker } = require("node:worker_threads");

const worker = new Worker("./easyway-thread.js");

worker.on("message", (msg) => {
  console.log("Main thread received message: ", msg);
});

worker.postMessage("Hello from main thread");
