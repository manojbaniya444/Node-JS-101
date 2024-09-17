const { workerData, parentPort } = require("worker_threads");
const zlib = require("node:zlib");
const fs = require("node:fs");

let BATCH_NO = 1;

const compress = (data) => {
  return new Promise((resolve, reject) => {
    zlib.deflate(data, (err, byte) => {
      if (err) {
        console.log("Error occur", err);
        reject(err);
      }
      resolve(byte);
    });
  });
};

(async () => {
  const data = fs.readFileSync("text.txt");
  const totalIteration = workerData.count;
  const batchSize = 100;

  let remainingIterations = totalIteration;

  // running in batches because of the event loop that we constantly the event loop is handling for the promises that we are creating so when this is done in batches then we can have a better utilization.
  while (remainingIterations > 0) {
    const iterationToProcess = Math.min(batchSize, remainingIterations);
    let promises = [];

    for (let i = 0; i < iterationToProcess; i++) {
      promises.push(
        compress(data)
          .then((result) => {})
          .catch((error) => {
            console.log("Error compressing data", error);
          })
      );
    }
    await Promise.all(promises);
    console.log(`Batch ${BATCH_NO} completed`);
    remainingIterations -= iterationToProcess;
    BATCH_NO++;
  }
})();
