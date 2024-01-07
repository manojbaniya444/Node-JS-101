const http = require("node:http");
const server = http.createServer();

// handling the requests
server.on("request", (request, response) => {
  console.log("_________METHODS_________");
  console.log(request.method);
  console.log("_________URL_________");
  console.log(request.url);
  console.log("_________HEADERS_________");
  console.log(request.headers);

  // data from the request
  // * Data will be in the form of stream
  console.log("_________BODY_________");
  request.on("data", (chunkData) => {
    console.log(chunkData.toString("utf-8"));
  });

  // after reading the data from the request
  request.on("end", () => {
    console.log("Request is received from the client: ", request.headers.name);

    // sending response to the client
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ message: "Hi world" }));
  });
});

server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
