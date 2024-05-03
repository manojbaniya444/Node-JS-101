const net = require("node:net");

const server = net.createServer();
const PORT = 8080;
const HOST = "192.168.1.69";

server.on("connection", async (socket) => {
  /**
   * Receiving data from the client
   */

  socket.on("data", (data) => {
    console.log(data.toString());
    // parse the data

    const [firstLine, ...headers] = data.toString().split("\n");
    const [method, path, httpVersion] = firstLine.trim().split(" ");
    // console.log(headers);
    const headersObject = {};

    headers.forEach((header) => {
      if (header.trim() !== "") {
        const [key, value] = header.split(":");

        headersObject[key.trim()] = value;
      }
    });

    // first need to send header name "owner" from the client.
    socket.write(`HTTP/1.1 200 OK\n\nHello ${headersObject["owner"]}`);

    socket.end((error) => {
      if (error) {
        console.error(error);
      }
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
