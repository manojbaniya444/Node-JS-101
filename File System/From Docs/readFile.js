const fs = require("node:fs/promises");
const path = require("node:path");

async function readFile() {
  try {
    const filePath = path.resolve(__dirname, "./files/file.txt");
    const contents = await fs.readFile(filePath, "utf-8");
    console.log(contents);
  } catch (error) {
    console.log(error);
  }
}

readFile()