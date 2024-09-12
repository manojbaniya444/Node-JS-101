# JavaScript Compression in Node.js

## Overview

Compression is the process of reducing the size of files to make data transmission faster and more efficient. In web applications, compressing assets like JavaScript files is critical to improve performance, reduce bandwidth usage, and enhance the user experience.

There are two types of compression:
- Lossless Compression 
- Lossy Compression

## Why is Compression Important?

1. **Faster Load Times**: Compressing JavaScript reduces the size of files, leading to faster load times for websites or apps.
2. **Reduced Bandwidth**: Smaller files use less bandwidth, which can result in cost savings for hosting and data transfers.
3. **Improved SEO**: Faster page loads can enhance search engine optimization (SEO) rankings.
4. **Better User Experience**: Users prefer sites that load quickly, and compression can help achieve that.

## Types of Compression

1. **Gzip Compression**: A popular and widely supported file compression format for HTTP content.
2. **Brotli Compression**: A newer compression algorithm that offers better compression rates than Gzip.
3. **Deflate Compression**: Another algorithm used in HTTP compression, similar to Gzip.

## How to Use Compression in Node.js

To compress responses in a Node.js application, we can use
- The inbuilt `zlib` library which is a transform stream and support gzip, deflate and brotli. 
-  the `compression` middleware package. It supports Gzip, Deflate, and Brotli.

```javascript
const zlib = require("node:zlib");

zlib.createGzip(); // returns the transform stream
zlib.createGunzip();
```

## Example usuage
To use for files in stream
```javascript
const zlib = require("node:zlib");
const fs = require("fs");

const src = fs.createReadStream("./text.txt");
const dest = fs.createWriteStream("compressed");

src.pipe(zlib.createBrotliCompress()).pipe(dest);
```
To use for the HTTP Compression of response
- Add the compression header
- Check for the browser supporting encoding, no need to do anything at the client side browser will automatically handle the unzip part if the enoding is specified and is supported by the browser at the client side, only need to add the content-encoding heder at the server side.

```javascript
res.setHeader("Content-Type","application/json")
res.setHeader("Content-Encoding","gzip")

zlib.gzip(JSON.stringify(data), (error, buffer) => {
    if (error) {
        console.error(error)
        return res.end()
    }

    res.end(buffer)
})
```

## Some Important thing to consider while using Compression
- Different compression algorithms works differently and are optimized for their specific data content, choose wisely which works better by benchmarking `Time vs Compression ratio` tradeoff.
- Compressed data can be cached to improve performance if it is frequently requested.
- Compression can expose  application to security vulnerabilities like the BREACH attack, especially if sensitive data (like tokens) is present in compressed responses.
- Disable compression for specific routes like for authentication routes or any route that has very low data size to be sent.