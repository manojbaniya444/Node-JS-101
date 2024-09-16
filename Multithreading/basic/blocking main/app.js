const { Worker } = require("node:worker_threads");

new Worker("./thread.js");

while(1){} // blocking the main thread