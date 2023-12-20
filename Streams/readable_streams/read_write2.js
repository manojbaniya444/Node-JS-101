const { read } = require("node:fs");
const fs = require("node:fs/promises");

(async () => {
  let chunkCount = 0;
  const fileHandleRead = await fs.open("mediumFile.txt", "r");
  const fileHandleWrite = await fs.open("destination.txt", "w");

  console.time("read_write");

  const readableStream = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024, // default highwater mark value for read stream
  });
  const writableStream = fileHandleWrite.createWriteStream();
  console.log(
    "Writable stream High Water Mark: ",
    writableStream.writableHighWaterMark
  );
  console.log(
    "Readable stream High Water Mark: ",
    readableStream.readableHighWaterMark
  );

  readableStream.on("data", (chunk) => {
    // writableStream.write(chunk);
    // chunkCount = chunkCount + 1;
    // but we know that here our chunk size is 64KiB and our writable internal buffer size is 16KiB so we might loose some data
    // *use draining to optimize the code
    if (!writableStream.write(chunk)) {
      // * When the internal buffer is full, writableStream.write() returns false and we pause the readable stream until the buffer is drained.
      readableStream.pause();
    }

    // * By this we copy the file by first reading the stream in chunks and then writing by pausing the read stream when the buffer is full and resuming the read stream on drain event until the execution is done.
  });

  // * Here resuming the readable stream on drain event to resume the reading process.
  writableStream.on("drain", () => {
    // console.log("drained");
    chunkCount = chunkCount + 1;
    // now as the buffer is drained we can resume the readable stream
    readableStream.resume();
  });

  readableStream.on("end", () => {
    console.log("Done Reading");
    fileHandleRead.close();
    console.log("Chunk Count: ", chunkCount);
  });
  console.timeEnd("read_write");
})();
