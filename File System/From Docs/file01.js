const fs = require("node:fs/promises");
const fsSync = require("node:fs");

let fileHandle;
(async () => {
  try {
    fileHandle = await fs.open("temp.txt", "r");
  } catch (error) {
    console.log(`Error opening file: ${error}`);
  } finally {
    if (fileHandle) {
      await fileHandle.close();
      console.log(`File closed successfully: async`);
    }
  }
})();

async function deleteFileAsync(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} deleted successfully: async`);
  } catch (error) {
    console.log(`Error deleting file ${filePath}: async`);
  }
}

function deleteFileCallback(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) throw error;
    console.log(`File ${filePath} deleted successfully: callback`);
  });
}

function deleteFileSync(filePath) {
  try {
    fsSync.unlinkSync(filePath);
    console.logI(`File ${filePath} deleted successfully: sync`);
  } catch (error) {
    console.log(`Error deleting file ${filePath}: sync`);
  }
}

deleteFileAsync("./temp.txt");
// deleteFileCallback("temp.txt");
// deleteFileSync("temp.txt")
