// ?Here I will use stream.end() to end the stream which will eventually emit the "finish" event.

const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  const fileHandler = await fs.open("write3.txt", "w");
  const stream = fileHandler.createWriteStream();
  console.time("write");

  let i = 0;
  const numberOfWrites = 1000000;
  async function writeMany() {
    // we wan to write 1 million times
    // run this loop from 0 to 1 million
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      // end the stream if this is our last write before the while loop exits
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // test the internal buffer if it is full or not
      if (!stream.write(buff)) {
        // if the internal buffer is full, we stop the loop and wait for the drain event to be emitted and also we stop from writing more to the stream
        break;
      }

      // if nothing happend, then we simple increase the count by 1 and write again
      i++;
    }
  }

  writeMany();

  // we are listening to the drain event which will be emitted when the internal buffer is emptied
  stream.on("drain", () => {
    // if the internal buffer is emptied, we can write again
    // i will be the last value of i from the while loop
    writeMany();
  });

  // when the i reaches the value of number of writes - 1 then end the stream and here we can listen then finish event
  stream.on("finish", () => {
    console.timeEnd("write");
    // for benchmarking
    fileHandler.close();
  });
})();

// Execution time: 3.1 seconds (1 million) and 21.5 seconds (10 million)
//
