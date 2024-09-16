const generatePrimes = require("./generatePrime");
const { parentPort, workerData } = require("worker_threads");

const { count, start } = workerData;

let primes = generatePrimes(count, start);

parentPort.postMessage(primes);
