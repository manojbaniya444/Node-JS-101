const { clear } = require("node:console");
const net = require("node:net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const client = net.createConnection(
  { port: 9000, host: "127.0.0.1" },
  async () => {
    // sending the message to the server
    const ask = async () => {
      const message = await rl.question("Enter a message:");
      client.write(`>User ${id}: ${message}`);
      await clearLine(0);
      await moveCursor(0, -1);
    };
    ask();
    // receiving the message from the server
    /**
     * Inside the callback function: If we place client.on("data") inside the callback function it will be registered after the connection is established. This means that it will not miss any "data" events emitted immediately upon connection. This is usually the preferred placement, especially when dealing with servers that send data as soon as the connection is established.
     */
    client.on("data", async (chunkData) => {
      // checking if the data is id or message
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      dataInString = chunkData.toString("utf-8");
      if (dataInString.startsWith("Id:")) {
        let index = dataInString.indexOf(":");
        id = dataInString.substring(index + 1);

        console.log(
          `You are connnected to the chat server and your id is ${id}`
        );
      } else {
        console.log(chunkData.toString("utf-8"));
      }

      ask();
    });
  }
);
/**
 * @client placement
 * Outside the callback function: If we place client.on("data") outside the callback function, it will be registered immediately when client is created, before the connection is established. This can potentially lead to missing "data" events that are emitted immediately upon connection, if the connection is established before the event listener is registered.
 */
// client.on("data", (chunkData) => {
//   console.log("Message received: ", chunkData.toString("utf-8"));
// });

// this is to show when the server closes
client.on("error", () => {
  console.log("Connection was closed by the server.");
});
