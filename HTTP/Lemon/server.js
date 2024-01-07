const Lemon = require("./Lemon");

const lemon = new Lemon();

lemon.route("get", "/", (req, res) => {
    res.sendFile("../web-server/public/index.html", "text/html");
});

lemon.listen(9000, () => {
  console.log("Server running port: 9000");
});
