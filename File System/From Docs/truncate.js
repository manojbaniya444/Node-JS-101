const fs = require("node:fs/promises");

let fileHandle = null;

async function truncateFile(filePath, size) {
  try {
    fileHandle = await fs.open(filePath, "r+");
    await fileHandle.truncate(size);
  } catch (error) {
    console.log(`Error opening file: ${error}`);
  } finally {
    await fileHandle?.close();
  }
}

truncateFile("temp.txt", 4);

 // truncate to 4 bytes
 // if the previously was shorter than len bytes, it is extended with null bytes
