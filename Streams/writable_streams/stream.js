const { write } = require("node:fs");
const fs = require("node:fs/promises");

let fileHandle;

async function writeData() {
  try {
    fileHandle = await fs.open("stream.txt", "w");

    const buff = Buffer.alloc(16383, "a");

    const writeStream = fileHandle.createWriteStream();
    console.log(
      "Writable stream high watermark : ",
      writeStream.writableHighWaterMark
    );

    const isWritable = writeStream.write(buff);

    console.log("Write Length :", writeStream.writableLength);

    console.log("Is writable Initially for 16383 bytes:", isWritable);

    console.log(
      "Is Writable: for next 1 byte :",
      writeStream.write(Buffer.alloc(1, "a"))
    );

    console.log("Write length: ", writeStream.writableLength);

    // check the draining event
    writeStream.on("drain", () => {
      console.log("Stream drained");
      console.log("Free to write more data...");
      console.log(
        "Is Writable after drain: ",
        writeStream.write(Buffer.alloc(1, "a"))
      );
    });
  } catch (error) {
    console.log(error);
  }
}

writeData();
