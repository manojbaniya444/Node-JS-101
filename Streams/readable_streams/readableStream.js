// In readable stream we read from huge file and we get the data in chunks

const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("smallFile.txt", "r");
  // readable stream
  const readableStream = fileHandleRead.createReadStream({
    highWaterMark: 1, // set how many byte we want per chunks
  });
  // setting to watermark value 400 bytes means we will get 400 bytes of data in each chunk
  // *we can read by receiving  event "data" with chunk of data
  readableStream.on("data", (chunk) => {
    // default HighWaterMark value is 64kiB
    // also we can set HighWaterMark value by passing it as an option
    console.log(chunk);
    // we will get chunk of data in buffer format of size we set in HighWaterMark but the max is 64kiB
  });

  // *We have another event "end" which is fired when all the data is read
  readableStream.on("end", () => {
    console.log("Read complete.");
  });
})();
