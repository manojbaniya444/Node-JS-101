const { Worker } = require("node:worker_threads");

// variable a assigned 100 in the main thread
const a = 100;

// creating 2 worker threads
const thread1 = new Worker("./thread.js");
const thread2 = new Worker("./thread.js");

// after 5 seconds creating another worker thread
setTimeout(() => {
  const thread3 = new Worker("./thread.js");
}, 5000);

console.log("Main thread with value of a: ", a);
