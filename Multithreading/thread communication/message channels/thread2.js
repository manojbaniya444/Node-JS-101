const { workerData, parentPort } = require("node:worker_threads");

const port = workerData.port;

// getting the message from the main thread on port object
port.on("message", (msg) => {
  console.log(` Worker Thread received message: ${msg}`);
  process.exit(0);
});

// sending the message from the worker thread to the main
port.postMessage("Hello from worker thread after receiving message.");
