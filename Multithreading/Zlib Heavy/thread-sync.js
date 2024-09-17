const { workerData, parentPort } = require("worker_threads");
const zlib = require("node:zlib");
const fs = require("node:fs");

const data = fs.readFileSync("text.txt");

const compressSync = () => {
  try {
    zlib.deflateSync(data);
    return "done";
  } catch (error) {
    console.log("Error during compressing data", error);
    throw error;
  }
};

const totalIteration = workerData.count;

for (let i = 0; i < totalIteration; i++) {
  try {
    compressSync();
  } catch (err) {
    console.log("Error compressing data", err);
  }
}

parentPort.postMessage("done compressing");
