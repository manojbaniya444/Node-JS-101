const { MessageChannel } = require("node:worker_threads");

const { port1, port2 } = new MessageChannel();

port1.postMessage("Hello from main thread");
port2.on("message", (msg) => {
  console.log(`Main thread received message: ${msg}`);
});
