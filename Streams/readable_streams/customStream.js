// Creating our own stream

const fs = require("node:fs/promises");

(async () => {
  console.time("copy");
  try {
    const fileHandleRead = await fs.open("numbers.txt", "r");
    const fileHandleWrite = await fs.open("destination.txt", "w");

    let bytesRead = -1;
    const readFileStat = await fileHandleRead.stat();
    // Stats {
    //     dev: 1150300244,
    //     mode: 33206,
    //     nlink: 1,
    //     uid: 0,
    //     gid: 0,
    //     rdev: 0,
    //     blksize: 4096,
    //     ino: 1125899908023409,
    //     size: 50,
    //     blocks: 0,
    //     atimeMs: 1703173203937.6252,
    //     mtimeMs: 1703171474323.9548,
    //     ctimeMs: 1703171474323.9548,
    //     birthtimeMs: 1703171459289.7126,
    //     atime: 2023-12-21T15:40:03.938Z,
    //     mtime: 2023-12-21T15:11:14.324Z,
    //     ctime: 2023-12-21T15:11:14.324Z,
    //     birthtime: 2023-12-21T15:10:59.290Z
    //   }
    while (bytesRead !== 0) {
      // for setting read buffer
      const buff = Buffer.alloc(readFileStat.size); // only setting the size of buffer equal to the file size but can be set to max size of readable buffer if the file is too large
      const offset = 0;
      const length = buff.byteLength; // number bytes to read
      const position = 0; // position in file to start reading from
      const readResult = await fileHandleRead
        .read
        // buff, default is 16384
        // offset,
        // length,
        // position
        ();
        // this readResult is an object with two properties and it is a promise
      // bytes read: 50
      // buffer: <Buffer 20 .... 16334 >
      bytesRead = readResult.bytesRead;
      // at end the bytes read will be 0

      if (bytesRead !== 16384) {
        // In this code, bytesRead is being used to check if the end of the file or stream has been reached. If bytesRead is not equal to 16384 (which seems to be the expected chunk size), it means that the end of the file or stream has been reached, and the code handles this case differently from when a full chunk is read.

        // The buff.indexOf(0) call is looking for the first occurrence of the byte value 0 in the buffer buff. It returns the index at which this value is found, or -1 if the buffer does not contain this value.

        // In this context, it seems to be used to find the first unfilled position in the buffer. When reading from a file or a stream in Node.js, if the end of the file or stream is reached before the buffer is completely filled, the remaining positions in the buffer are filled with 0s. So, buff.indexOf(0) is used to find the position where these 0s start.

        // This is then used to create a new buffer newBuffer that contains only the data that was actually read, excluding the trailing 0s. This new buffer is then written to the file or stream represented by fileHandleWrite.
        console.log(
          "bytesRead if part: ",
          readResult.bytesRead,
          readResult.buffer.toString()
        );
        const indexOfNotFilled = readResult.buffer.indexOf(0);
        // yo chai yedi 16384 vandaa kam chha vane kataa baata 0 fill hunu suru chha tyahi ko index dincha
        console.log("index of not fill value : ", indexOfNotFilled);
        // allocate the newBuffer for the last buffer that is not completely filled by the read stream
        const newBuffer = Buffer.alloc(indexOfNotFilled);
        readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled); // target : targetStart : sourceStart and source end
        await fileHandleWrite.write(newBuffer);
      } else {
        // here we will write if the file is large and the readBuffer size is complete that is 16KiB and we will only not enter this block if the file is small and the readBuffer size is not complete
        await fileHandleWrite.write(readResult.buffer);
      }
    }
    console.timeEnd("copy");
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log("File not found!");
    } else {
      console.log(e);
    }
  }
})();
