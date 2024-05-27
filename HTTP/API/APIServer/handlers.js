// handlers.js
const { getFileHandler } = require("./controller.js");

async function handleJson(req, res) {
  await getFileHandler("./db/data.json", "application/json", res);
}

async function handleAbout(req, res) {
  await getFileHandler("./view/index.html", "text/html", res);
}

module.exports = {
  handleJson,
  handleAbout,
};
