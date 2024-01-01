const net = require("node:net");

const server = net.createServer();

let clients = [];

server.on("connection", (socket) => {
  const clientId = clients.length + 1;
  const newClient = {
    socket,
    clientId,
  };

  // sending the information to the client after connectiont o the server is established
  socket.write(`Id:${clientId}`);

  console.log(`New user connected ${clientId}`);

  clients.map((client) => {
    client.socket.write(`User ${clientId} joined the chat.`);
  });

  socket.on("data", (chunkData) => {
    clients.map((client) => {
      // client.socket is the socket of the client
      client.socket.write(chunkData);
    });
  });

  socket.on("error", () => {
    console.log(`User ${clientId} disconnected`);
    // clients = clients.filter((client) => client.clientId !== clientId);
    clients.map((client) => {
      if (client.clientId === clientId) {
        client.socket.destroy();
      }
      client.socket.write(`User ${clientId} left the chat.`);
    });
  });

    clients.push(newClient);
});

server.listen(9000, () => {
  console.log("Server is running on port 9000: ", server.address());
});
