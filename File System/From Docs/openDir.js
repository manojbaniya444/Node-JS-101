const fs = require("node:fs/promises");

(async () => {
  try {
    const dir = await fs.opendir("newDir");

    for await (const dirent of dir) {
      console.log(dirent);
    }
  } catch (error) {
    console.log(error);
  }
})();
