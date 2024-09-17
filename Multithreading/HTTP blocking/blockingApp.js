const http = require("node:http");
const { performance } = require("node:perf_hooks");
const generatePrimes = require("./primeGenerator");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received: ", req.url, req.method);

  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Hi from the server." }));
  }

  if (req.url === "/generate-prime") {
    const startTime = performance.now();
    const primeNumbers = generatePrimes(
      (count = 200),
      (startingNumber = 100_000_000_000_000)
    );
    const endTime = performance.now();
    const timeElapsed = endTime - startTime;

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({ prime: primeNumbers, timeTaken: timeElapsed }));
  }
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
