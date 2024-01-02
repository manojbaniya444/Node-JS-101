const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("path");

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const client = net.createConnection(
  { host: "localhost", port: 9000 },
  async () => {
    // file from the device
    // console.log(process.argv);
    const filePath = process.argv[2];
    const fileName = path.basename(filePath);
    console.log(fileName);
    if (!filePath) {
      console.log("Please provide the file path.");
      process.exit(1);
    }

    client.write(`fileName:${fileName}---------`);

    const fileHandler = await fs.open(filePath, "r");
    const readStream = fileHandler.createReadStream();
    const fileSize = (await fileHandler.stat()).size;

    let bytesUploaded = 0;
    let percentageUploaded = 0;

    console.log();

    // readStream.pipe(client);

    readStream.on("data", async (chunkData) => {
      if (!client.write(chunkData)) {
        readStream.pause();
      }
      bytesUploaded = bytesUploaded + chunkData.byteLength;
      let percentUpload = Math.floor((bytesUploaded / fileSize) * 100);
      if (percentUpload !== percentageUploaded) {
        percentageUploaded = percentUpload;
        await clearLine(0);
        await moveCursor(0, -1);
        console.log(`Uploading file ${percentageUploaded} % done.`);
      }
    });

    client.on("drain", () => {
      readStream.resume();
    });

    readStream.on("end", () => {
      console.log("File uploaded successfully.");
      // ending the connection
      client.end();
    });
  }
);

client.on("error", () => {
  console.log("Server disconnects.");
  client.end()
});
