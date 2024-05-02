# Class: net.Socket

> This class is an abstraction of a TCP socket or a streaming IPC endpoint.It is also an EventEmitter.

A net.socket can be created by the user and used directly to interact with a server.

It is returned by **net.createConnection()**, so the user can use it to talk to the server.

# Events:

- Event: 'close'
  Emitted once the socket is fully closed.

- Event: 'connect'
  Emitted when a socket connection is successfully established

- Event: 'connectionAttempt' (in v>20)
  Emitted when a new connection attempt is started

- Event: 'connectionAttemptFailed'(in v>20)
  Emitted when a connection attempt failed.

- Event: 'connectionAttemptTimeout' (in v>20)
  Emitted when a connection attempt timed out.

- Event: 'data'
  Emitted when data is received.The argument data will be a Buffer or String.

The data will be lost if there is no listener when a Socket emits a 'data' event.

- Event: 'drain'
  Emitted when the write buffer becomes empty. Can be used to throttle uploads.

- Event: 'end'
  Emitted when the other end of the socket signals the end of transmission, thus ending the readable side of the socket.

- Event: 'error'
  Emitted when error. The 'close' event will be called directly following this event.

- Event: 'lookup'
  Emitted after resolving the hostname but before connecting.

- Event: 'ready;
  Emitted when a socket is ready to be used.
  Triggered immediately after 'connect'

- Event: 'timeout'
  Emitted if the socket times out from inactivity.This is to notify that the socket has been idle.The user must manually close the connection.

# socket.address()

> returns the bound address, the address family name and port of the socket as reported by the operating system.

# socket.bytesRead

> The amount of received bytes.

# socket.bytesWritten

> The amoung of bytes sent.

# socket.connect()

> Initiate a connection on a given socket.

```javascript
const net = require("node:net");

// for both IPC and TCP
net.connect({
  port: 80,
  onread: {
    buffer: Buffer.alloc(1024),
    callback: function (nread, buff) {
      console.log(buff.toString("utf8", 0, nread));
    },
  },
});
```
# socket.pause()
> Pause the rading of data. That is 'data' events will not be emitted.

# socket.end(data, encoding, cb)
> Half close the socket

# socket.resume()
> Resumes reading after a call to socket.pause()

# socket.write()
> sends data on the socket. 'drain' event will be emitted when the buffer is again free.