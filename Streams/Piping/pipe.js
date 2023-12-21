const fs = require("node:fs/promises");

(async () => {
  console.time("copy");

  const handleFileRead = await fs.open("source.txt", "r");
  const handleFileWrite = await fs.open("destination.txt", "w");

  const readStream = handleFileRead.createReadStream();
  const writeStream = handleFileWrite.createWriteStream();

  readStream.pipe(writeStream);
  readStream.on("end", () => {
    console.timeEnd("copy");
    console.log(readStream.readableFlowing); // this will return true if the stream is flowing
    // readStream.unpie(writeStream); // this will stop the stream
  });
})();

// Execution time: 165 ms
