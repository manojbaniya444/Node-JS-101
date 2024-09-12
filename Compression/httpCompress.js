const http = require("node:http");
const zlib = require("node:zlib");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");

  // sample json data
  const jsonData = {
    name: "John Doe",
    age: 30,
    city: "New York",
    siblings: {
      brother: "Jake Doe",
      sister: "Jane Doe",
    },
    isMarried: false,
    isEmployed: true,
    isStudent: false,
  };

  // use the compression if the request is for compressed data
  if (req.url === "/compressed") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",
    });
    zlib.gzip(JSON.stringify(jsonData), (error, buf) => {
      if (error) {
        console.error(error);
        return res.end();
      }
      res.end(buf);
      console.log("Response sent after compression successfully.");
    });
  }

  // send the data without compression
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(jsonData));
  console.log("Response sent without compression.");
});

server.listen(8080, () => {
  console.log("Server started at http://localhost:8080");
});
