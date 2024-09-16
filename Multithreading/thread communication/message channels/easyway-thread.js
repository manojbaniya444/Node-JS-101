const { parentPort } = require("node:worker_threads");

parentPort.on("message", (msg) => {
  console.log(`Worker received message: ${msg}`);
  parentPort.postMessage("Hello from worker thread");
  process.exit(0);
});
