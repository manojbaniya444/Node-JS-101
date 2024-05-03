const { parseHeader } = require("../utils/parseHeader.js");

const data = `GET / HTTP/1.1
owner: Manoj Baniya
Content-Type: text/plain
User-Agent: PostmanRuntime/7.37.3
Accept: */*
Postman-Token: 54f8aeba-3004-4678-9d50-f80dba1e1173
Host: 192.168.1.69:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 30

Hi iam you client from postman
`;

const { parsedHeader, body } = parseHeader(data);

console.log("________________Header_________________");
console.log(parsedHeader);
console.log("________________Body________________");
console.log(body);
