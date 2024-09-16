console.log("Worker thread running.");

for (let i=0; i<1_000_000_000; i++) {
  // some heavy task to run.
}

console.log("Worker thread complete execution.");