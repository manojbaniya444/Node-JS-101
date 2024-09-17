const http = require("node:http");
const { performance } = require("node:perf_hooks");
const { Worker } = require("node:worker_threads");
const server = http.createServer();

server.on("request", (req, res) => {
  //   console.log("Request received: ", req.url, req.method);

  // This route is available even when the server is busy generating prime numbers because the prime number generation is done in a separate thread.
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Hi from the server." }));
  }

  // BENCHMARKING: This route took around 6000ms to generate 200 prime starting from 100_000_000_000_000
  if (req.url === "/generate-prime") {
    const startTime = performance.now();
    const worker = new Worker("./thread.js", {
      workerData: {
        count: 200,
        startingNumber: 100_000_000_000_000,
      },
    });

    worker.on("message", (primeNumbers) => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      res.end(
        JSON.stringify({
          prime: primeNumbers,
          timeTaken: timeElapsed,
        })
      );
    });
  }
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
