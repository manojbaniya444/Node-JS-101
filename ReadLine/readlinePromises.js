const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

(async () => {
  const answer = await rl.question("What is your name? \n");
  console.log("Hello: ", answer);
})();
// once this code is invoked, the node js application will not terminate until the readline.Interface is closed because the interface waits for data to be received on the input stream.

//* EVENT: "close"
// -> The 'close' event emits when one of the following occur:
// 1. The rl.close() method is called.
// 2. The input stream receives the 'end' event.
// 3. The input stream receives the ctrl + C or ctrl + D key combination.

rl.on("line", (input) => {
  console.log(`Received: ${input}`);

  if (input === "exit") {
    rl.close();
  }
});

rl.on("history", (history) => {
  console.log("History array", history);
});

rl.on("close", () => {
  console.log("Interface closed!");
});

rl.on("pause", () => {
  console.log("Interface paused!");
});

rl.on("resume", () => {
  console.log("Interface resumed!");
});

rl.on("SIGINT", async () => {
  console.log("Received SIGINT");
  const exitAnswer = await rl.question(
    "Are you sure you want to exit? (yes/no) \n"
  );

  if (exitAnswer.match(/^y(es)?$/i)) {
    rl.pause();
  }
});

rl.prompt();
