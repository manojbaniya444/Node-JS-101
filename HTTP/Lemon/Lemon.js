const http = require("node:http");
const fs = require("node:fs/promises");

class Lemon {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.middlewares = [];

    // *Handling the requests
    this.server.on("request", async (request, response) => {
    //   console.log("request received");
      response.sendFile = async function (path, mime) {
        const fileHandle = await fs.open(path, "r");
        const readStream = fileHandle.createReadStream();
        response.setHeader("Content-Type", mime);
        readStream.pipe(response);
      };
      // *Handling unmatched routes
      if (!this.routes[request.method.toLowerCase() + request.url]) {
        response.statusCode = 404;
        response.setHeader("Content-Type", "application/json");
        return response.end(
          JSON.stringify({ message: `Error: ${request.method} ${request.url}` })
        );
      }

      // executing the request
      this.routes[request.method.toLowerCase() + request.url](
        request,
        response
      );
    });
  }

  // *Defining the routes
  route(method, path, cb) {
    // lemon.route("get", "/", (req, res) => {});
    // cb = (req,res) ={}
    this.routes[method + path] = cb;
  }

  // *Starting the server
  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Lemon;
