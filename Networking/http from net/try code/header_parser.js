const data = `GET /favicon.ico HTTP/1.1
Host: 192.168.1.69:8080
Connection: keep-alive
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
Referer: http://192.168.1.69:8080/
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8

This is a message from the client
`

// Lets parse this request from the client
const [firstLine, ...headers] = data.split("\n");

const [method, path, httpVersion] = firstLine.trim().split(" ");

const headersObject = {};

headers.forEach((header) => {
  if (header.trim() !== "") {
    const [key, value] = header.split(":");
    console.log("KEY VALUE",key, value)

    headersObject[key.trim()] = value;
  }
});

console.log("________________FirstLine________________");
console.log(firstLine);
console.log("________________Method________________");
console.log(method);
console.log("________________Path________________");
console.log(path);
console.log("________________HTTP Version________________");
console.log(httpVersion);
console.log("________________Headers________________");
console.log(headersObject);
// console.log(headers)
