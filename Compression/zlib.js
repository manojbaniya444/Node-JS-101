const zlib = require("node:zlib");
const fs = require("node:fs");

const readStream = fs.createReadStream("./files/aaa.txt")
const writeStream = fs.createWriteStream("./files/compressed");

readStream.pipe(zlib.createGzip()).pipe(writeStream);