const fs = require("node:fs/promises");

let fileHandle;

async function checkFileAccess(filePath) {
  // Tests a user's permissions for the file or directory specified by the file path string.
  // The mode argument is an optional integer that specifies the accessibility checks to be performed.
  // mode should be either the value fs.constants.F_OK to test the existence of the file, or it can be the inclusive OR of one or more of fs.constants.R_OK, fs.constants.W_OK, and fs.constants.X_OK to test permissions.

  try {
    await fs.access(filePath, fs.constants.W_OK);
    console.log("File can be written");
  } catch (error) {
    console.log("File cannot be written");
  }
}

async function changeFilePermissions(filePath, mode) {
    try {
        // filepath = path to the file
        // mode = the new permissions for the file < string > | < integer >
        // 0o400 = Read permission
        // 0o600 = Read and write permission
        // 0o755 = Read, write, and execute permission
        // 0o200 = Write permission
        await fs.chmod(filePath, mode);
    } catch (error) {
        console.log("Error while changing the file permissions.")
    }
}

const filePath = "./files/file.txt";

console.log("Changing file permissions...");

changeFilePermissions(filePath, 0o600);

checkFileAccess(filePath);

console.log("Changing file permissions...");

changeFilePermissions(filePath, 0o444);

checkFileAccess(filePath);