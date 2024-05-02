const net = require("node:net");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clientSocket = net.createConnection(
  { port: 8080, host: "127.0.0.1" },
  () => {
    console.log("connected to server!");
    console.log("INFO: ", clientSocket.address());
    clientSocket.write("Hello server.");
  }
);

clientSocket.on("data", (data) => {
  console.log("FROM SERVER: ", data.toString());
});

clientSocket.on("end", () => {
  console.log("disconnected from server.");
  clientSocket.end();
  process.exit(0);
});

rl.write("Enter 'close' to close the connection.");
rl.on("line", (input) => {
  clientSocket.write(input);
});
