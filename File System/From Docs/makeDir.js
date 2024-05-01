const fs = require("node:fs/promises");
const path = require("node:path");

async function makeDirectory() {
  const projectFolder = path.join(__dirname, "newDir");
  const dirCreation = await fs.mkdir(projectFolder, {
    recursive: true,
  });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);
