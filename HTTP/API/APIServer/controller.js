const fs = require("node:fs/promises");

async function getFileHandler(filePath, contentType, res) {
  try {
    const fileHandler = await fs.open(filePath, "r");
    const readStream = fileHandler.createReadStream();
    readStream.on("data", (chunk) => {
      res.writeHead(200, {
        "Content-Type": contentType,
        "content-length": Buffer.from(chunk).length,
      });
      res.write(chunk);
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandler.close();
    });
    readStream.on("error", async (error) => {
      console.error("Stream error:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      await fileHandler.close();
    });
  } catch (error) {
    console.error("Error opening file:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

module.exports = { getFileHandler };
