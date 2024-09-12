const fs = require("node:fs/promises");
const path = require("node:path");
const zlib = require("node:zlib");
const { performance } = require("node:perf_hooks");

// "gzip", "brotli", "deflate"
const METHOD = "deflate";

const filesDir = path.join(__dirname, "files");
const compressedDir = path.join(__dirname, METHOD);

console.log("Compression Used: ", METHOD);

const isThereCompressedDir = async () => {
  try {
    const compressedDirExists = await fs.stat(compressedDir);
    if (compressedDirExists.isDirectory()) {
      await fs.rm(compressedDir, { recursive: true });
      console.log(`Deleted existing ${METHOD} directory and its contents.`);
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error checking compressed directory:", error);
    }
  }

  try {
    await fs.mkdir(compressedDir);
    console.log(`Created ${METHOD} directory.`);
  } catch (error) {
    console.error("Error creating compressed directory:", error);
  }
};

// compressing a file
const compressFile = async (file) => {
  const filePath = path.join(filesDir, file);
  const compressedFilePath = path.join(
    compressedDir,
    path.basename(file, path.extname(file))
  );

  const startTime = performance.now();
  try {
    const readFile = await fs.open(filePath, "r");
    const writeFile = await fs.open(compressedFilePath, "w");

    const readStream = readFile.createReadStream();
    const writeStream = writeFile.createWriteStream();

    const zOptions = {
      level: 6,
      // windowBits: 15,
      // memLevel: 8,
      // strategy: 0,
    };

    const brotliOptions = {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
    };

    const compressor =
      METHOD === "gzip"
        ? zlib.createGzip(zOptions)
        : METHOD === "brotli"
        ? zlib.createBrotliCompress(brotliOptions)
        : METHOD === "deflate"
        ? zlib.createDeflate(zOptions)
        : null;

    if (!compressor) {
      console.error("Invalid compression method.");
      return;
    }
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Compressing file:", file);

    await new Promise((resolve, reject) => {
      readStream
        .pipe(compressor)
        .pipe(writeStream)
        .on("finish", async (error) => {
          if (error) {
            reject(new Error(`Error compressing: ${file} with error ${error}`));
          } else {
            console.log(`File compressed successfully: ${file}`);
            console.log(`Time taken: ${performance.now() - startTime}ms`);

            const originalStats = await fs.stat(filePath);
            const originalSize = originalStats.size;

            const compressedStats = await fs.stat(compressedFilePath);
            const compressedSize = compressedStats.size;

            console.log(`Original size: ${originalSize} bytes`);
            console.log(`Compressed size: ${compressedSize} bytes`);
            console.log(
              `Compression Ratio: ${(compressedSize / originalSize).toFixed(2)}`
            );
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
            resolve();
          }

          await readFile.close();
          await writeFile.close();
        });
    });
  } catch (error) {
    console.error("Error compressing file:", error);
  }
};

// read the dir files and compress them
const compressFilesFromDirectory = async () => {
  try {
    await isThereCompressedDir();

    const files = await fs.readdir(filesDir);
    for (const file of files) {
      await compressFile(file);
    }
  } catch (err) {
    console.error("Error reading files directory:", err);
  }
};

compressFilesFromDirectory();
