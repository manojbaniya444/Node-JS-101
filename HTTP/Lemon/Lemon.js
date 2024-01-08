const http = require("node:http");
const fs = require("node:fs/promises");

const parser = require("./libs/bodyParser");
const runMiddleware = require("./utils/runMiddleware");

class Lemon {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.middlewares = [];

    this.server.on("request", async (request, response) => {
      response.sendFile = async function (path, mime) {
        const fileHandle = await fs.open(path, "r");
        const readStream = fileHandle.createReadStream();
        response.setHeader("Content-Type", mime);
        readStream.pipe(response);
      };

      response.status = function (statusCode) {
        response.statusCode = statusCode;
        return response;
      };

      response.json = function (data) {
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(data));
        response.end();
      };

      runMiddleware(request, response, this.middlewares, 0);
    });
  }

  bodyParser() {
    this.middlewares.push(parser);
  }

  //---------Handling middlewares---------
  before(cb) {
    this.middlewares.push(cb);
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Lemon;
