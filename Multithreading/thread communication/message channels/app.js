const { Worker, workerData, MessageChannel } = require("node:worker_threads")

// channel object for communication between threads
const channel = new MessageChannel()
const port1 = channel.port1; // port1 for sending message
const port2 = channel.port2; // port2 for receiving message


const thread1 = new Worker("./thread.js", {
    workerData: {
        port: port1
    },
    // need to dedicate port1 to the worker thread
    transferList: [port1]
})

// listening to the message from the worker thread
port2.on("message", (msg) => {
    console.log(`Main thread received message: ${msg}`);
});

// sending the message to the worker thread from the main
port1.postMessage("Hello from main thread.")