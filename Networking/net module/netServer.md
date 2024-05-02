# Class: net.Server

> This class is used to create a TCP or IPC server

## net.Server is an EventEmitter with the following events:

- Event: 'close'

  > Emitted when the server closes. If connections exists, this event is not emitted until all connections are ended.

- Event: 'connection'

  > Emitted when a new connection is made. **socket** is an instance of net.Socket.

- Event: 'error'

  > Emitted when an error occurs

- Event: 'listening'

  > Emitted when the server has been bound after calling server.listen()

- Event: 'drop'
  > When the number of connections reaches the threshold of server.maxConnections, the server will drop new connections and emit 'drop' event instead.

## server.address()

> Returns the bound address, the address family name and port of the server as reported by the operating system.

[Link to JavaScript file](./netServer.js)

## server.listen()

> Start a server listening for connections. A net.Server can be a TCP or IPC server depending on what it listens to.

When the server starts listening, the listening event will be emitted.

```javascript
server.listen({
  host: "localhost",
  port: 80,
  exclusive: true,
});
```

## server.listening
> Indicated whether or not the server is listening for connections

## server.maxConnections
> Set this ro reject connections when the server's connection count gets high.
[Link to JavaScript file](./netServer.js)

