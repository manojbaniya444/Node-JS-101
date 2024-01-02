const net = require("node:net");
const fs = require("node:fs/promises");

const server = net.createServer((socket) => {}); // here also same as server.on connection

server.on("connection", async (socket) => {
  let fileHandler;
  let writeStream;
  let fileName;
  socket.on("data", async (chunkData) => {
    // first chunk data
    // console.log("new chunk received from the client");
    if (!fileHandler) {
      const idx = chunkData.indexOf("---------");
      fileName = chunkData.toString("utf-8").substring(9, idx);
      console.log("The file name is", fileName);
      console.log("How many times");
      try {
        fileHandler = await fs.open(`./storage/${fileName}`, "w");
      } catch (error) {
        console.log("Error opening file: ");
        return;
      }
      writeStream = fileHandler.createWriteStream();
      writeStream.write(chunkData.subarray(idx + 9));
      socket.resume();

      writeStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!writeStream.write(chunkData)) {
        socket.pause();
      }
    }
  });

  socket.on("end", () => {
    console.log("New file received from the client.");
    if (fileHandler) fileHandler.close();
    writeStream = undefined;
    fileHandler = undefined;
    fileName = undefined;
    socket.destroy()
  });

  // !Handling stream by pipe not let us know about the file name and file type so it is not a good idea to use pipe here
  //   socket.pipe(writeStream);

  socket.on("error", () => {
    console.log("Client disconnects.");
  });
});

server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
