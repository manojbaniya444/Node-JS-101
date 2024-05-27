const http = require("node:http");
const { handleRequest, addRoute } = require("./router");
const { handleJson, handleAbout } = require("./handlers");

const server = http.createServer(handleRequest);

addRoute("GET", "/json", handleJson);
addRoute("GET", "/about", handleAbout);

server.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
