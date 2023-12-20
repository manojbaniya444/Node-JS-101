// ?Benchmarking writing millions time to a file
const fs = require("node:fs/promises");

(async () => {
  const handleFile = await fs.open("big.txt", "w");
  console.time("write");
  for (let i = 0; i < 1000000; i++) {
    await handleFile.write(` ${i} `);
  }
  console.timeEnd("write");
  handleFile.close()
})();

// Execution Time: 1min 10 seconds for 1 million writes
// memory usuage: around 1000 MB
// CPU usuage:  80% on average