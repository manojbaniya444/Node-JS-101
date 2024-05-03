function parseHeader(requestDataFromClient) {
  const [header, body] = requestDataFromClient.split("\r\n\r\n");
  const [firstLine, ...rest] = header.split("\r\n");
  const [method, path, httpVersion] = firstLine.trim().split(" ");
  const headersObject = {};
  // lets create a headers object
  rest.forEach((header) => {
    if (header.trim() !== "") {
      const [key, value] = header.split(":");
      headersObject[key.trim()] = value;
    }
  });

  const parsedHeader = {
    method,
    path,
    httpVersion,
    headers: headersObject,
  };

  return { parsedHeader, body };
}

module.exports = { parseHeader };
