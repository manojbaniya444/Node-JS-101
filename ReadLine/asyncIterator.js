//? readline.createInterface() will start to consume the input strea, once invoked. Having asynchronous operations between interface creation and asynchronous iteration may resilt in missed lines.

const readline = require("node:readline");

async function processLineByLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  for await (const line of rl) {
    console.log(`Received: ${line}`);
  }
}

processLineByLine();
