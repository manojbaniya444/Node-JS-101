// creating out client agent to make request to the server
const http = require("node:http");

// creating agent
const agent = new http.Agent({ keepAlive: true });

// creating request
const request = http.request({
  agent,
  hostname: "localhost",
  port: 9000,
  method: "POST",
  path: "/post",
  headers: {
    "Content-Type": "application/json",
    "name": "node js client",
  },
});

// this is the response event and will emit only once after the response is received
request.on("response", (response) => {
  if (response) {
    console.log("_________STATUS_________");
    console.log(response.statusCode);
    console.log("_________HEADERS_________");
    console.log(response.headers);
    console.log("_________BODY_________");
    response.on("data", (chunkData) => {
      console.log(chunkData.toString("utf-8"));
    });

    // after reading the response data
    response.on("end", () => {
      console.log("Response is received from the server.");
    });
  } else {
    console.log("No response received");
  }
});

request.write(JSON.stringify({ name: "Hello world" }));

// ending our write stream
// if the content length is specified then the request will end automatically otherwise we have to end it manually
request.end();
