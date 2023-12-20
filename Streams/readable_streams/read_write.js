// * HardDrive has very high read speed than write speed. So we might loose some data when we neglect about it.

const { read } = require("node:fs");
const fs = require("node:fs/promises");

(async () => {
  let chunkCount = 0;

  const fileHandleRead = await fs.open("mediumFile.txt", "r");
  const fileHandleWrite = await fs.open("destination.txt", "w");
  console.time("read_write");
  // *readable stream <Highwatermark: 16384> i.e 16384byte per chunk we receive which is equal to writable internal buffer size so there wont be any problem
  const readableStream = fileHandleRead.createReadStream({
    highWaterMark: 16384,
  });
  // writable stream
  const writableStream = fileHandleWrite.createWriteStream();

  readableStream.on("data", (chunk) => {
    // console.log(chunk);
    chunkCount = chunkCount + 1;
    writableStream.write(chunk);
  });

  readableStream.on("end", () => {
    console.log("Done Reading");
    writableStream.end();
    fileHandleRead.close();
  });

  writableStream.on("finish", () => {
    console.log("Done Writing");
    console.timeEnd("read_write");
    console.log("Chunk Count: ", chunkCount);
    fileHandleWrite.close();
  });
})();

// Execution Time: 290 ms for 84KiB file
// Execution Time: 330 ms for 84MB file
// Memory usuage: constant around 20MiB
