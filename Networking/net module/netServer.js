const net = require("node:net");

const server = net.createServer();

console.log("Before server listen", server.listening);

server.maxConnections = 2;

const PORT = 8080;
const HOST = "127.0.0.1";
server.listen(PORT, HOST, () => {
  console.log("opened server on", server.address());
});

server.getConnections((err, count) => {
  console.log("connections", count);
  console.log("Max connections: ", server.maxConnections);
});

console.log("After server listen", server.listening);

//? EVENT: 'connection' <net.Server>
server.on("connection", (serverSocket) => {
  console.log("INFO: Client connected");

  //? EVENT: 'data' <net.Socket>
  serverSocket.on("data", (data) => {
    console.log("FROM CLIENT: ", data.toString());
    if (data.toString() === "close") {
      serverSocket.end("Bye bye client.\r\n");
    }
  });

  //? EVENT: 'finish' <net.Socket>
  serverSocket.on("finish", () => {
    console.log("Reading finish.");
  });

  //? EVENT: 'end' <net.Socket>
  serverSocket.on("end", () => {
    console.log("INFO: Client disconnected");
  });

  serverSocket.on("error", (error) => {
    // console.log("ERROR: ", error);
    if (error.code === "ECONNRESET") {
      console.log("INFO: Client disconnected");
    }
  });
});

//? SERVER EVENT: 'close' <net.Server>
server.on("drop", (data) => {
  console.log("INFO: Client dropped", data.localAddress);
});
