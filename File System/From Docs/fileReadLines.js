const { open } = require("node:fs/promises");

async function readLines(filePath) {
  const file = await open(filePath);

  const stat = await file.stat();

  for await (const line of file.readLines()) {
    console.log(`Line: ${line}`);
  }

  console.log(stat.size);
}

readLines("temp.txt");
