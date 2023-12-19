const { Buffer } = require("buffer");

const buffer = Buffer.from([0x48, 0x69, 0x21]);
const buffer2 = Buffer.from("486921", "hex");
console.log(buffer.toString("utf-8"));
console.log(buffer2);
console.log(buffer2.toString("utf-8"));

const nameBuffer = Buffer.from("Manoj Kumar Baniya", "utf-8");
{
  /* <Buffer 4d 61 6e 6f 6a 20 4b 75 6d 61 72 20 42 61 6e 69 79 61> */
}
console.log(nameBuffer);
console.log(Buffer.from("4d616e6f6a", "hex").toString("utf-8"));
console.log(Buffer.poolSize); // 8192 -> 8Kib
console.log(Buffer.poolSize >>> 1); // shift right by one in binary which is divide by 2 in decimal
// 8192/2 -< 4Kib