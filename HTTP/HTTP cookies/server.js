const http = require("node:http");

const server = http.createServer((req, res) => {
  // cors headers
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Credentials", "true");
});

server.on("request", (req, res) => {
  if (req.url === "/cookie") {
    res.setHeader("Set-Cookie", "name=John; Secure; HttpOnly");
    res.setHeader("Set-Cookie", "cookie=value; Secure; HttpOnly");
    res.setHeader(
      "Set-Cookie",
      "name=jane; SameSite=Strict; Max-Age=360000"
    );
    return res.end("Cookie has been set");
  }
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
