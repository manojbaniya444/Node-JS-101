// More on writable streams

const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  // opening/creating a file in write mode
  const handleFile = await fs.open("write2.txt", "w");
  // creating a writable stream
  const stream = handleFile.createWriteStream();
  // writing to the stream with 16384 bytes which is equal to its internal buffer size
  const buff1 = Buffer.alloc(16384, "A");
  stream.write(buff1);
  console.log("WritableLength after 16384:", stream.writableLength);
  console.log("Is buffer full or not: ", stream.write("M"));
  // Now the buffer is full and it returns false and emits the drain event

  // !Dont run this code
  // ?This will run into infinite loop because we are using 16384 Bytes to write which will cause the drain event and while on the drain event we are again writing new 16384 Bytes which is emitting another drain event in this way we are infinitely writing new 16384 Bytes to the stream and emitting drain event and writing again and so on
  stream.on("drain", () => {
    console.log("Write more: ", stream.write(Buffer.alloc(16383, "B")));
    // I changed this to 16383 to prevent from running into infinite loop and probably crash
    console.log(
      "Writable Length after drain event and adding 16384 B: ",
      stream.writableLength
    );
    console.log("Safe to write more.");
  });
})();
