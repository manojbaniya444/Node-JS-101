const { read } = require("node:fs");
const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("numbers.txt", "r");
  const fileHandleWrite = await fs.open("destination.txt", "w");

  const readStream = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const writeStream = fileHandleWrite.createWriteStream();

  readStream.on("data", (chunk) => {
    // console.log(chunk.toString("utf-8"));
    const numbers = chunk.toString("utf-8").split(" ");
    console.log(numbers);
    numbers.forEach((number) => {
      let n = Number(number);
      if (n % 2 == 0) {
        if (!writeStream.write(` ${n} `)) {
          readStream.pause();
        }
      }
    });
  });

  writeStream.on("drain", () => {
    readStream.resume();
    console.log("Safe to add more.");
  });

  readStream.on("end", () => {
    fileHandleRead.close();
  });
})();
