const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const signal = AbortSignal.timeout(10_000);

signal.addEventListener(
  "abort",
  () => {
    console.log("Aborted!");
    process.exit(0);
  },
  { once: true }
);

(async () => {
  const answer = await rl.question("What is your name? ", { signal });
  console.log(`Hello, ${answer}!`);
})();
