const parser = (req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    let data = "";
    req.on("data", (chunkData) => {
      data = data + chunkData.toString("utf-8");
    });

    req.on("end", () => {
      let body = JSON.parse(data);
      req.body = body;
      next();
    });
  } else {
    next();
  }
};

module.exports = parser;
