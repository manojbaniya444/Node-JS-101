const fs = require("node:fs/promises");

let fileHandle;

// Asynchronously append data to a file, creating the file if it does not exist yet..
// data is string of buffer
async function appendFile(filePath, data, options) {
  try {
    fileHandle = await fs.open(filePath, "a");
    await fileHandle.appendFile(data, options);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
}

const filePath = "./files/file.txt";
const data = "This is the data to be append on the new file.txt";
const encoding = "utf8";
const mode = 0o666;
const flag = "a";
const flush = true; // if true, the file will be flushed to disk after each write. If false, the file will only be flushed to disk after the file is closed.

const options = {
  encoding,
  mode,
  flag,
  flush,
};

appendFile(filePath, data, options);
