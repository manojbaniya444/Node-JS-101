const Lemon = require("./Lemon");

const app = new Lemon();

//---------Body Parser---------
app.bodyParser();
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

app.route("post", "/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({ message: "Login successful", username, password });
});

app.listen(9000, () => {
  console.log("Server running port: 9000");
});
