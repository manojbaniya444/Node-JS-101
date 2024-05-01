const readline = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

rl.question("What is your name? \n", (answer) => {
  console.log("Hello: ", answer);
});

rl.on("line", (input) => {
  console.log(`Received: ${input}`);

  if (input === "exit") {
    rl.close();
  }
});

rl.on("close", () => {
  console.log("Interface closed!");
});
