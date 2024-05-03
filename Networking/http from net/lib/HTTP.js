const net = require("node:net");

const { parseHeader } = require("../utils/parseHeader");
const { saveDataToDatabase } = require("../utils/saveDataToDatabase");

const server = net.createServer();

server.on("connection", (socket) => {
  let dataFromClient;
  socket.on("data", (data) => {
    dataFromClient = data.toString();
  });

  socket.on("end", async () => {
    const { parsedHeader, body } = parseHeader(dataFromClient);

    saveDataToDatabase(body, parsedHeader);
  });

  socket.write(`HTTP/1.1 200 OK\n\nHello World!`);

  socket.end("Bye Bye!", (error) => {
    if (error) {
      console.error(error);
    }
  });
});

module.exports = { server };
