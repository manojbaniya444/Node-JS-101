const { Worker, workerData, MessageChannel } = require("node:worker_threads");

const channel1 = new MessageChannel();
const channel2 = new MessageChannel();

// use channel 1 to communicate with thread1
const thread1 = new Worker("./thread2.js", {
  workerData: { port: channel1.port2 },
  transferList: [channel1.port2],
});

// use channel 2 to communicate with thread2
const thread2 = new Worker("./thread2.js", {
  workerData: { port: channel2.port2 },
  transferList: [channel2.port2],
});

// listening to the message from the worker thread
channel1.port1.on("message", (msg) => {
  console.log("Main thread channel 1 received messsage: ", msg);
});

channel2.port1.on("message", (msg) => {
  console.log("Main thread channel 2 received message: ", msg);
});

// sending message to the worker thread
channel1.port1.postMessage("Hello from main thread channel 1");
channel2.port1.postMessage("Hello from main thread channel 2");
