//? rl.curosr track where the current curosr lands in the input string.
//? The position of cursor determines the portion of the input string that will be modified as input is processed, as well as the cloumn where the terminal caret will render.

//? This is used in scenarios where we want to track or manipulate cursor position, such as when building custom command line interfaces or implementing certain editing features.

const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name? \n", (answer) => {
  rl.write("Hello:");
  console.log("Cursor position: ", rl.cursor);
  console.log("Hello:", answer);

  const cursorPos = rl.getCursorPos();
  console.log("Cursor position: ", cursorPos);

  rl.close();
});
