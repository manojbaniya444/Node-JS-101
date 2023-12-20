# Streams
- In Node js streams are objects that enable us to read or write data continuously. They provide an efficient way to handle large amount of data continuously. They provide an efficient way to handle large amounts  of data by breaking it into smaller chunks, which can be processed or transmitted piece by piece. There are several types of streams in node js.

## Types of streams
1) ### Readable Streams
- These are used for reading data. Examples include reading a file or receiving a HTTP request.
2) ### Writable streams
- They are used for writing data. Examples include writing to a file or sending an HTTP response.
3) ### Duplex streams
- These streams can be used for both reading and writing. An example is a TCP Socket.
4) ### Transform streams
- These are a type of duplex stream where the output is calculated based on the input. They are commonly used for data transformation.

> Streams provide a way to work with data more efficiently, as they allow when dealing with large datasets, as they allow us to process data in chunks without loading the entire dataset into the memory at once.