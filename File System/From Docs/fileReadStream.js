const fs = require("node:fs/promises");
(async () => {
  const fd = await fs.open("temp.txt", "r");

  const stream = fd.createReadStream();

  stream.on("data", (chunk) => {
    console.log(chunk.toString());
  });
})();
