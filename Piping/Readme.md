# Understanding Piping

In Node.js, piping is a mechanism provided by the "stream" module to simplify the process of transferring data between readable and writable streams.
Streams are a crucial part of the Node js framework, allowing us to efficiently work with large amounts of data by processing it in smaller, managable chunks.

The "pipe" method is used for piping data between streams. When we pipe a readable stream into a writable stream , node js takes care of managing the flow of data from the source to destination. This can be particularly useful for tasks like reading from a file or a network socket and writing to another file or a response stream.

# Pipelining

A module to pipe between streams and generators forwarding errors and property cleaning up and provides a callback when the pipeline is complete
> stream.pipeline() will call stream.destroy(error) on all streams except: Readable streams which have emitted "end" or "close" and writable streams which have emitted "finish" or "close"

> const { pipeline } = require("stream)
> pipeline(readstream,duplex/transform, duplex/transform, duplex/transform, writablestream, (error) => {})
