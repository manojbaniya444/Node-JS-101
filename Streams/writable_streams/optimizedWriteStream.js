const fs = require("node:fs/promises");

// Execution Time: 2.2secs for 1 million times
// Execution Time: 24 secs for 10 million times
// Ecevution Time:
// Memory Usage: 40MB constant
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  let i = 0;

  const numberOfWrites = 1000000;
  let drainCount = 0;

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
    // console.log("Drained!!!");
    drainCount++;
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
    console.log("Drain Count: ", drainCount);
    fileHandle.close();
    // 481 drain count means after each drain 481 * 16384 bytes of data was written to the file so the total bytes written to the file is 481 * 16384 =  7879261 = 7.5 MB file size
  });
})();
