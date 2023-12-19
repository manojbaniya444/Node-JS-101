// ?Buffer is a way to store and manipulate binary data in Node.js

// *The Buffer class in Node.js is used to perform operations on raw binary data. Generally, Buffer refers to the particular memory location in memory. Buffer and array have some similarities, but the difference is array can be any type, and it can be resizable. Buffers only deal with binary data and it can not be resozable. Each integer in a buffer represents a byte.

const { Buffer } = require("buffer")
const buff = Buffer.alloc(3) // this will be in byte and baaki rako 0 fill huncha
// 24-bit ko laagi - > 8 byte

buff[0] = 0x48 // this is in Hex and according to utf-8 encoding 0100 1000 is character "H"
buff[1] = 0x69
buff[2] = 0x21

console.log(buff)
{/* <Buffer 48 69 21 00 00 00 > in hex */} 
console.log(buff.toString("utf-8"))