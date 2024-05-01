const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Set up an event listener for when the user enters a line of text
rl.on('line', (input) => {
  console.log(`Received: ${input}`);
  rl.prompt(); // Display the prompt again
});

// Set up an event listener for when the user closes the input stream (Ctrl + D)
rl.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});

// Display the initial prompt
// -> This will display the prompt and wait for the user to enter a line of text
rl.prompt();
