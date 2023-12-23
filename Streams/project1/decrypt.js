const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (i != 255) {
        chunk[i] = chunk[i] - 1;
      }
    }
    callback(null, chunk);
    console.log("Text decrypted successfully!");
  }
}

(async () => {
  const readFileHandle = await fs.open("encrypted.txt", "r");
  const writeFileHandle = await fs.open("decrypted.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const decrypt = new Decrypt();
  readStream.pipe(decrypt).pipe(writeStream);
})();
