const http = require("node:http");
const fs = require("node:fs/promises");

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
        return;
      };

      response.json = function (data) {
        response.setHeader("Content-Type", "Application/json");
        response.write(JSON.stringify(data));
        response.end();
      };

      //---------Running middlewares before response---------

      const runMiddleware = (request, response, middlewares, index) => {
        if (index === middlewares.length) {
          //---------Handling unmatched routes---------
          if (!this.routes[request.method.toLowerCase() + request.url]) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "application/json");
            return response.end(
              JSON.stringify({
                message: `Error: ${request.method} ${request.url}`,
              })
            );
          }
          //---------executing the request---------
          this.routes[request.method.toLowerCase() + request.url](
            request,
            response
          );
        } else {
          middlewares[index](request, response, () => {
            runMiddleware(request, response, middlewares, index + 1);
          });
        }
      };

      runMiddleware(request, response, this.middlewares, 0);
    });
  }

  //---------Handling middlewares---------
  before(cb) {
    // lemon.before((req,res, next) => {})
    this.middlewares.push(cb);
  }

  route(method, path, cb) {
    // lemon.route("get", "/", (req, res) => {});
    // cb = (req,res) ={}
    this.routes[method + path] = cb;
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Lemon;
