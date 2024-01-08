const Lemon = require("./Lemon");

const app = new Lemon();

//---------Middlewares---------

app.before((req, res, next) => {
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    res.status(500);
    res.json({ message: "Error: 500" });
  } else {
    next();
  }
});

//---------Routes---------

app.route("get", "/", (req, res) => {
  res.sendFile("../web-server/public/index.html", "text/html");
});

app.route("get", "/index.js", (req, res) => {
  res.sendFile("../web-server/public/index.js", "text/javascript");
});

app.route("get", "/style.css", (req, res) => {
  res.sendFile("../web-server/public/style.css", "text/css");
});

app.route("get", "/about", (req, res) => {
  res.sendFile("../web-server/public/index.html", "text/html");
});

app.listen(9000, () => {
  console.log("Server running port: 9000");
});
