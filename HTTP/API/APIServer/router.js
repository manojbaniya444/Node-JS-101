const routes = {};

function addRoute(method, url, handler) {
  routes[`${method}:${url}`] = handler;
}

async function handleRequest(req, res) {
  const method = req.method;
  const url = req.url;
  const routeKey = `${method}:${url}`;

  if (routes[routeKey]) {
    try {
      await routes[routeKey](req, res);
    } catch (error) {
      console.error("Error handling request:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

module.exports = {
  addRoute,
  handleRequest,
};
