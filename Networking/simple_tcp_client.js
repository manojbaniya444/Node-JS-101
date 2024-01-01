// This is our client
const net = require("node:net");

const client = net.createConnection({ port: 9000, host: "127.0.0.1" }, () => {
  client.write("A simple message sent from the client");
});
