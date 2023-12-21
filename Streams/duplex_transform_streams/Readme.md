# Duplex/Transform Streams
In Node.js both Duplex and Transform are types of streams that extend the basic stream class provided by the "stream" module. Streams are a fundamental concept in node.js for handling I/O operations efficiently, especially when dealing with large amounts of data.

# Duplex Streams
> Duplex streams represent a stream that is both readable and writable. This means we can both read data from it and write data into it. It's essentially a combination of a Readable and Writable stream.
> Duplex streams can be used for full-duplex communication, where data can be sent and received simultaneously.
> Examples: networks socket, some implementaion oof inter-process communication (IPC)
> const { Duplex } = require("stream")

# Transform Streams
> Transform streams are a specific type of duplex stream where the output is directly related to the input. They are commomly used for data transformations.
> Transform streams have both a readable and writable streams and they allow us to modify or transform the data as it pass through.
> Examples: data-compression, encryption, converting data from one format to another.