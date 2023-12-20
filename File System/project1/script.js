// ?This project is to watch a file command_file.txt and run the command according to the file text.

const fs = require("node:fs/promises");

// file path to use for this directory
// C:\\Users\\acer\\Desktop\\UNCC\\File System\\project1\\<newFile.txt>

//functions
// creating a new file
async function createFile(filePath) {
  try {
    // check if the file already exists or not
    const file = await fs.open(filePath, "r");
    console.log("File already exist: ");
    file.close();
  } catch (error) {
    await fs.open(filePath, "w");
    console.log("File created successfully.");
  }
}

// delete file
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log("File deleted successfully.");
  } catch (error) {
    console.log("Error deleting file: ");
  }
}

// rename file
async function renameFile(oldFilePath, newFilePath) {
  try {
    await fs.rename(oldFilePath, newFilePath);
    console.log("File renamed successfully.");
  } catch (error) {
    console.log("Error renaming file: ");
  }
}

// append to file
async function appendFile(filePath, content) {
  try {
    const file = await fs.open(filePath, "a");
    await file.write(content);
    console.log("New content added to the file successful.");
  } catch (error) {
    console.log("Error appending to file: ");
  }
}

(async () => {
  const watcher = fs.watch("./command_file.txt");
  // we can also watch the whole directory file changes but now we will only watch the command_file.txt
  // *This will constantly watch the file <command_file.txt> and will run when the file changes
  for await (const event of watcher) {
    // *This is async iterator
    // { eventType: 'change', filename: 'command_file.txt' }
    // only look for the event type "change" and for the file with filename: "command_file.txt"
    if (event.eventType === "change" && event.filename === "command_file.txt") {
      console.log("Command file changes.");
      // open the file
      // read/write/modify/delete the file according to the command in the file
      // each opened file will have a file descriptor
      // close after the work has been completed
      const commandFileHandler = await fs.open("./command_file.txt", "r");
      // we opened our command_file in reading mode\
      // read the content of the file (Here many parameters can be passed.)
      // By default Buffer size is : 16384 -> 16Kib
      // allocating buffer size by first figuring out the size of the file
      const fileStats = await commandFileHandler.stat();
      //   console.log(fileStats); // we will use size property
      const fileSize = fileStats.size;
      //   console.log("File size", fileSize);
      const buff = Buffer.alloc(fileSize);
      const offset = 0; // location to start filling buffer
      const length = buff.byteLength;
      const position = 0; // position we want to start read
      // here content buffer is occupying too much space so we need to allocate the only required size and also specifying other properties
      await commandFileHandler.read(buff, offset, length, position);
      //   console.log(buff.toString("utf-8"), buff);
      // now we have content from the command_file.txt we can get the command we need
      const commandFromFile = buff.toString("utf-8");

      // now check what the command in the file contains
      const CREATE_FILE = "create file";
      const DELETE_FILE = "delete file";
      const RENAME_FILE = "rename file";
      const APPEND_FILE = "append file";

      if (commandFromFile.includes(CREATE_FILE)) {
        const filePath = commandFromFile.substring(CREATE_FILE.length + 1);
        console.log("To create the file:", filePath);
        createFile(filePath);
      }
      if (commandFromFile.includes(DELETE_FILE)) {
        const filePath = commandFromFile.substring(DELETE_FILE.length + 1);
        console.log("To delete the file:", filePath);
        deleteFile(filePath);
      }
      if (commandFromFile.includes(RENAME_FILE)) {
        // rename file <originalFilePath> to <newFilePath>
        let index = commandFromFile.indexOf(" to ");
        const originalFilePath = commandFromFile.substring(
          RENAME_FILE.length + 1,
          index
        );
        const newFilePath = commandFromFile.substring(index + 4);

        console.log(
          `Rename the file from ${originalFilePath} to ${newFilePath}`
        );
        renameFile(originalFilePath, newFilePath);
      }
      if (commandFromFile.includes(APPEND_FILE)) {
        // append file <filePath> content:<content>
        let index = commandFromFile.indexOf(" content:");
        const filePath = commandFromFile.substring(
          APPEND_FILE.length + 1,
          index
        );
        const content = commandFromFile.substring(index + 9);
        console.log(
          `To append the content <${content}> to the file path ${filePath}`
        );
        appendFile(filePath, content);
      }

      commandFileHandler.close();
    }
  }
})();
