/**
 * Runs the middleware functions in order.
 *
 * @param {http.IncomingMessage} request - The request object.
 * @param {http.ServerResponse} response - The response object.
 * @param {Function[]} middlewares - The array of middleware functions.
 * @param {this.routes[]} routes - The array of routes.
 * @param {number} index - The current index in the middleware array.
 */

const runMiddlewares = (request, response, middlewares, index) => {
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
    this.routes[request.method.toLowerCase() + request.url](request, response);
  } else {
    middlewares[index](request, response, () => {
      runMiddlewares(request, response, middlewares, index + 1);
    });
  }
};
module.exports = runMiddlewares;
