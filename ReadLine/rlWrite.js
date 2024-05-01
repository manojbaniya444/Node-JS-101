const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Write a message to the terminal
// -> The rl.write() method will write the data to interface output stream.
rl.write("Welcome to my Node.js application!\n");

rl.write("HI\n");

// Ask the user for input
rl.question("What is your name? ", (name) => {
  rl.write(`Hello, ${name}! Nice to meet you.\n`);
  rl.close();
});
