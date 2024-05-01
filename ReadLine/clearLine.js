const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

rl.question("What is your name? ", async (answer) => {
  await clearLine(0);
  await moveCursor(0, -1);
    console.log(`Hello, ${answer}!`);
});

// The clearLine function clears the current line of the output stream in the specified direction. The moveCursor function moves the cursor in the output stream by the specified number of columns and rows. The code uses these functions to clear the question and move the cursor up one row before printing the greeting message. This way, the greeting message is printed on the same line as the question, without leaving any blank lines in between.
