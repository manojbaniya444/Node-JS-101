//? Returns an async iterator that watches for changes on filename, where filename is either a file or a directory.

const fs = require("node:fs/promises");

const ac = new AbortController();
const { signal } = ac;

setTimeout(() => ac.abort(), 20000);

async function watch() {
  try {
    const watcher = fs.watch("./files/file.txt", { signal });

    for await (const event of watcher) {
      console.log(event);
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Watching aborted");
    } else {
      return console.error(error);
    }
  }
}

watch();


// This code will watch the specified file for changes.
// if any changes occur than this will log the change type in event
// the change may be file modified , rename or delete
// here this will watch the file.txt for 20seconds until the abort signal is sent

// { eventType: 'change', filename: 'file.txt' } -> file content changes
// { eventType: 'change', filename: 'file.txt' } -> file content changes
// { eventType: 'rename', filename: 'file.txt' } -> file renamed