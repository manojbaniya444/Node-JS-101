const fs = require("node:fs");

const content = fs.readFileSync("./text.txt");
// <Buffer 48 65 6c 6c 6f 20 49 20 61 6d 20 4d 61 6e 6f 6a 20 42 61 6e 69 79 61 2e> from the file with text <Hi I am Manoj Baniya.>
console.log(content);

// now displaying in characters "utf-8"
console.log(content.toString("utf-8"));

// copy the file with synchronous method.
fs.copyFileSync("text.txt", "newText.txt");
// not recommended to use -----> Blocking main thread.
// should be cautious when using it only use it when we are 100% sure.

// using callback for copying ( This method is faster )
// in callback the first argument is always <error>
fs.copyFile("text.txt", "copyCallBack.txt", (error) => {
  if (error) {
    console.log("Error copying file using callback: ", error);
  } else {
    console.log("File copied using callback successfully: ");
  }
});
