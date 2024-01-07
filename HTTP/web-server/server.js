const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on("request", async (request, response) => {
  // Handling the path and url from the request
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");
    // read and server the html file as the response
    const fileHandle = await fs.open("./public/index.html", "r");
    const readStream = fileHandle.createReadStream();
    readStream.pipe(response);
  }

  // after the html is sent the browser will automatically send the request for the css and javascript files imported in it so we need to serve them as well here
  if (request.url === "/style.css" && request.method === "GET") {
    response.setHeader("Content-Type", "text/css");
    const fileHandle = await fs.open("./public/style.css", "r");
    const readStream = fileHandle.createReadStream();
    readStream.pipe(response);
  }
  if (request.url === "/index.js" && request.method === "GET") {
    response.setHeader("Content-Type", "text/javascript");
    const fileHandle = await fs.open("./public/index.js", "r");
    const readStream = fileHandle.createReadStream();
    readStream.pipe(response);
  }

  // adding the json routes
  if (request.url === "/api" && request.method === "GET") {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    response.end(JSON.stringify({ message: "Hello World" }));
  }

  // getting from the body
  if (request.url === "/api" && request.method === "POST") {
    let body = "";
    request.on("data", (chunkData) => {
      console.log(chunkData);
      body += chunkData;
    });
    request.on("end", () => {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      console.log("body", JSON.parse(body));
      response.end(JSON.stringify({ message: (JSON.parse(body)).name }));
      response.end();
    });
  }
});

server.listen(9000, "127.0.0.1", () => {
  console.log("Server is running on port 9000");
});
