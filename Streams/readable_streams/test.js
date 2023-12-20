const fs = require("node:fs/promises");
const { Buffer } = require("node:buffer");

(async () => {
  let drainCount = 0;
  const writeFileHandler = await fs.open("test.txt", "w");
  const stream = writeFileHandler.createWriteStream();
  const buffer = Buffer.alloc(16384, "a");

  console.time("write");

  if (!stream.write(buffer)) {
    console.log("Buffer is full");
  }

  stream.on("drain", () => {
    console.log("drained");
    stream.write(Buffer.from("Manoj Kumar Baniya"));
  });

  console.timeEnd("write");
})();
