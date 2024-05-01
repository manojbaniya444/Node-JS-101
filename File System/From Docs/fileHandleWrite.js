const fs = require("node:fs/promises");

let fileHandle;

(async () => {
  try {
    fileHandle = await fs.open("newFile.txt", "w");

    const buffer = Buffer.from("Hello, world! I am fileHandleWrite node", "utf-8");
    const offset = 0; // the start position from the biffer where the data to write begins
    const length = buffer.length; // the number of bytes from buffer to write
    const position = 0; // the offset from the beginning of the file where the data from buffer should be written

    const res = await fileHandle.write(buffer, offset, length, position);

    const { bytesWritten, buffer: bf } = res;
    console.log(`${bytesWritten} bytes written > ${bf}`);
  } catch (error) {
  } finally {
    await fileHandle?.close();
  }
})();

async function writeFile(filePath, data) {
  // this asynchronously writes data to a file replcaing the file if it already there.
  try {
    const fd = await fs.open(filePath, "w");

    const options = {
      encoding: "utf-8"
    }
    await fd.writeFile(data, options)
  } catch (error) {
    
  }
}

writeFile("newFile2.txt", "Hello, world! I am writeFile node");