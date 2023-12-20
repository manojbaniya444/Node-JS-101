// Internal Buffer : 16KiB : 16384 Bytes
// * Buffer is a location in memory which holds specific amount of data
// * Write to buffer --> After buffer is full (draining) release and then again write another buffer. Otherwise memory will be full or crash as like in other codes.

// ?Fixing the code that we wrote in stream

const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  const fileHandler = await fs.open("write.txt", "w");

  const stream = fileHandler.createWriteStream();
  //   console.log(stream); all the stream methods
  console.log("Stream writable high watermark: ", stream.writableHighWaterMark); // 16384 bytes is the size of the internal buffer of the writable stream
  // writing to a stream
  //   stream.write("Hello world");
  console.log("Stream writablelength at start: ", stream.writableLength); // 11 bytes because we wrote 11 bytes Hello World for each character encoded in utf-8 character encoding and occupying 8-bit i.e 1 byte so total writableLength has now become 11 bytes
  const buff = Buffer.from(" Hello world");
  //   stream.write(buff);
  console.log("Stream writable length:middle ", stream.writableLength);
  // 22 bytes because more 11 bytes are added to the buffer

  // ?What will happen if the internal buffer becomes full or the high water mark is reached i.e 16384 bytes
  // *Then the stream will emit an event called drain
  const buffFull = Buffer.alloc(16384, "a");
  console.log("Is buff full or not: ", stream.write(buffFull));
  // false because the buffer is full and return true if the buffer is not full so in out case it returns false
  // if we had allocated a buffer of less than the size of internal buffer size of writable stream then it would have returned true but in our case we have used the same size of buffer as the internal buffer size of writable stream so it returns false
  console.log("Stream writable length at end: ", stream.writableLength);
  // Now the internal buffer is full lets try to write more in the stream
  console.log("Is buff full or not: ", stream.write("M"));
  // * When the internal buffer is full of the writable stream then it will return false and it emits the "drain" event and then we can write more to the stream

  // * Writablelength should not exceed the highWaterMark value
  // * Always check for the writable length before writing to the stream

  stream.on("drain", () => {
    console.log("Now we can write more.");
    console.log(
      "Is buffer full after drain event: ",
      stream.write(Buffer.alloc(5, "N"))
    );
    // true because the buffer is empty now after drain event
    console.log(
      "WritableLength of stream after drain event and adding more 5 'N': ",
      stream.writableLength
    );
    // writable length is only 5 bytes because we have added 5 bytes to the buffer afte it has been drained(empty)
  });
})();
