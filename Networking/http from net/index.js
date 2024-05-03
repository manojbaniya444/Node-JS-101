const { server: app } = require("./lib/HTTP.js");

const PORT = 8080;
const HOST = "192.168.1.69";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
