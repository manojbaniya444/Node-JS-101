const { workerData, parentPort } = require("node:worker_threads");
const generatePrimes = require("./primeGenerator");

const primes = generatePrimes(workerData.count, workerData.startingNumber);

parentPort.postMessage(primes);
