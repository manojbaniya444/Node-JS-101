//? Reads the contents of a directory.
//? The fs.readdir() method is used to asynchronously read the contents of a directory.

const fs = require("node:fs/promises");

(async () => {
  try {
    const files = await fs.readdir("./files");

    for (const file of files) {
      console.log(file);
    }
  } catch (error) {
    console.log(error);
  }
})();
