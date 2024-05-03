const { formatBody } = require("./formatBody");
const fs = require("node:fs/promises");

async function saveDataToDatabase(body, parsedHeader) {
  let fileHandle;
  // saveDataToDatabase()
  const formattedBody = formatBody(body);
  try {
    fileHandle = await fs.open(
      `./db/${parsedHeader.headers.owner.split(" ")[1]}.txt`,
      "a"
    );
    const writeStream = fileHandle.createWriteStream();

    writeStream.write(formattedBody);

    writeStream.end();

    writeStream.on("finish", () => {
      console.log("finished");
      if (fileHandle) {
        fileHandle.close();
      }
    });
  } catch (error) {
    console.error(error);
    if (fileHandle) {
      fileHandle.close();
    }
  }
}

module.exports = { saveDataToDatabase };
