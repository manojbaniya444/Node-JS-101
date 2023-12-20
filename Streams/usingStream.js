const fs = require("fs/promises");
const { Buffer } = require("buffer");

(async () => {
  console.time("write");
  const fileHandle = await fs.open("big.txt", "w");
  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 10000000; i++) {
    const buffer = Buffer.from(` ${i} `);
    stream.write(buffer);
  }
  console.timeEnd("write");
  stream.end();
  fileHandle.close();
})();

// Dont use this code
// Execution time is a lot faster: 500ms (for writing million times) and around 4.5 seconds for writing around billion times.
// High CPU Usuage
// High Memory Usuage when the file is big
// Streams are not meant to be used like this


// ?We need to make our code more fast but also make it consume less memory and CPU

// ?So what exactly are streams
// Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.
// Stream: An abstract interface for working with streaming data in Node.js
// --> Data flowing --> Continuously --> But in chunks