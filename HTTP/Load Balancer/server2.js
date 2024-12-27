const http = require("node:http");
const fs = require("node:fs/promises");

const PORT = 8002;

const server = http.createServer(async (req, res) => {
  const fileHandle = await fs.open("./public/index.html", "r");
  const readStream = fileHandle.createReadStream();

  res.writeHead(200, { "Content-Type": "text/html" });
  readStream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
