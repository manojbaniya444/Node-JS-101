const fs = require("node:fs/promises");

(async () => {
  console.time("copy");
  let drainCount = 0;

  const fileHandle = await fs.open("source.txt", "w");
  const stream = fileHandle.createWriteStream();
  console.log("WritableHighWaterMark:: ", stream.writableHighWaterMark);
  let i = 0;
  let numberOfWrites = 10000000;

  const write = () => {
    while (i < numberOfWrites) {
      const buffer = Buffer.from(` ${i} `, "utf-8");
      if (i === numberOfWrites - 1) {
        return stream.end(buffer);
      }
      if (!stream.write(buffer)) {
        break;
      }
      i++;
    }
  };

  write();

  stream.on("drain", () => {
    drainCount++;
    write();
  });

  stream.on("finish", () => {
    console.timeEnd("copy");
    console.log("drainCount:: ", drainCount);
    fileHandle.close();
  });
})();
