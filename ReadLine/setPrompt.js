//? rl.setPrompt(prompt) wi;; set the prompt that will be written to output whenever rl.prompr() is called.

const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("What is your name? \n");
rl.prompt();

const prompt = rl.getPrompt();
console.log("Prompt: ", prompt);
// get the answer
rl.on("line", (answer) => {
  console.log("Received: ", answer);
  rl.close();
});

rl.on("close", () => {
  console.log("Interface closed!");
  process.exit(0);
});
