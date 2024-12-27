const http = require("node:http");

// proxy port
const PORT = 9000;

const mainServers = [
  { host: "localhost", port: 8001 },
  { host: "localhost", port: 8002 },
];

const proxyServer = http.createServer();

proxyServer.on("request", (clientRequest, proxyResponse) => {
  // get a server using some kind of algorithm
  // Here simply using Round Robin Algorithm
  const mainServer = mainServers.shift();
  mainServers.push(mainServer);

  console.log(
    `Forwarding request to http://${mainServer.host}:${mainServer.port}`
  );

  // can modify or block the request before forwarding it to the main server or apply any kind what is need to do before forwarding the request

  // Request we will be forwarding from client to one of our server
  // define the request with option

  const option = {
    host: mainServer.host,
    port: mainServer.port,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: clientRequest.headers,
  };

  const proxyRequestForward = http.request(option);

  // send the response after getting from the server
  proxyRequestForward.on("response", (serverResponse) => {
    proxyResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
    console.log(
      `Response from http://${mainServer.host}:${mainServer.port} with status code ${serverResponse.statusCode}`
    );
    serverResponse.pipe(proxyResponse);
  });

  proxyRequestForward.on("error", (e) => {
    console.log(e);
  });

  // send the client request to server
  clientRequest.pipe(proxyRequestForward);
});

// start the server
proxyServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
