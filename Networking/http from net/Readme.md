# Creating http server using the node js net module

## HTTP Messages

> HTTP messages are how data is exchanged between a server and a client. There are two types of messages: request sent by the client to trigger an action on the server and responses, the answer from the server.

- The start-line and HTTP headers of the HTTP message are collectively known as the head of the requests, whereas its payload is known as the body.

## Response to the client
socket.write("HTTP/1.1 200 OK\n\nHello World! ");

> We can send data to the client (browser) specifying these headers and body in order just using **socket.write** we fulfill the HTTP protocol and return some data.
> [Link Text](./http.js)

## Parsing the receiving sockets in server on 'data' event:

```
GET / HTTP/1.1\r\n
Host: 192.168.1.69:8080\r\n
Connection: keep-alive\r\n
Cache-Control: max-age=0\r\n
Upgrade-Insecure-Requests: 1\r\n
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36\r\n
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\r\n
Accept-Encoding: gzip, deflate\r\n
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8\r\n
\r\n
This is the message in the body from the client
```

The first word is the Method and followed by a path, then an HTTP version and followind lines are headers ending with two new lines.

## After parsing the data in the server which is client request.

```javascript
method = "GET";

Path = "/";

HTTP_version = "HTTP/1.1";

headers = {
  Host: " 192.168.1.69",
  Connection: " keep-alive",
  "User-Agent":
    " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: " image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  Referer: " http",
  "Accept-Encoding": " gzip, deflate",
  "Accept-Language": " en-GB,en-US;q=0.9,en;q=0.8",
};
```
> [Link](./utils/parseHeader.js)
