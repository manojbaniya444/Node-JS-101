const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    // console.log(chunk);
    for (let i = 0; i < chunk.length; i++) {
      if (i !== 255) {
        chunk[i] = chunk[i] + 1;
      }
    }
    callback(null, chunk);
    // console.log(chunk.toString("utf-8"))
  }
}

(async () => {
  // encryption
  const readFileHandle = await fs.open("to_encrypt.txt", "r");
  const writeFileHandle = await fs.open("encrypted.txt", "w");

  const writeStream = writeFileHandle.createWriteStream();
  const readStream = readFileHandle.createReadStream();

  const encrypt = new Encrypt();
  readStream.pipe(encrypt).pipe(writeStream);
})();
