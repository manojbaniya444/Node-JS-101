/**
 we can use net module from "node" which is at the lowest level possible in node
http is build on the top of the net module
we could do a lot things with this net module
 **/

const net = require("node:net");

const server = net.createServer((socket) => {
  // *socket is actually our connection and it is a duplex stream
  // *if anyone connect with us we have socket object as many as numbers of user connected in our server
  // * Socket is duplex stream so we can read and write from it
  socket.on("data", (chunkData) => {
    console.log(chunkData.toString());
  });
});

server.listen(9000, "127.0.0.1", () => {
  console.log("Server is running: ", server.address());
});

/* Now any tcp client can connect with this server */
