const fs = require("node:fs/promises");

(async () => {
  const options = fs.constants.COPYFILE_EXCL;
  // by using this option, the operation will fail if the destination file already exists.

  try {
    await fs.copyFile("./files/file.txt", "./files/file-copy.txt", options);
  } catch (error) {
    console.log(error);
  }
})();
