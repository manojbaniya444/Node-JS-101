const fs = require("node:fs/promises")

let fileHandle;

(async () => {
    try {
        fileHandle = await fs.open("temp.txt", "r")

        const buffer = Buffer.alloc(1024); //create a buffer to store the data
        const { bytesRead, buffer: dataBuffer} = await fileHandle.read(buffer, 0, 2, 1)

        // options
        // 1. buffer: a buffer that will be filled with the file data read Default Buffer.alloc(16384)
        // 2. offset: the offset in the buffer to start writing at Default 0
        // 3. length: an integer specifying the number of bytes to read Default buffer.length
        // 4. position: an integer specifying where to begin reading from in the file. Default 0

        // Example: if a file contains "Hello World"
        // fileHandle.read(buffer, 0, 2, 1) will read "el" from the file i.e read from 1st position and read 2 bytes and store it in buffer

        console.log(`Read ${bytesRead} bytes from file: ${dataBuffer.toString()}`)

        await fileHandle.close()
    } catch (error) {
        console.log(`Error opening file: ${error}`)
    }
})()