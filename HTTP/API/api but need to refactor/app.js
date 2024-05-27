const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

//TODO: 🔨 Make all file read at one place
// TODO: 🔨 Create a common response class
// TODO: 🆕 Add the url parser for dynamic params and queries
// TODO: ➕ Add the dedicated body parser

server.on("request", async (req, res) => {
  const method = req.method;
  const url = req.url;

  console.log(`Method: ${method} - URL: ${url}`);

  switch (method) {
    case "GET":
      if (url === "/api/products") {
        try {
          const fileHandler = await fs.open("db.json", "r");

          const readStream = fileHandler.createReadStream();

          readStream.on("data", (chunk) => {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "content-length": Buffer.from(chunk).length,
            });
            res.write(chunk);
          });

          readStream.on("end", async () => {
            res.end();
            await fileHandler.close();
          });
        } catch (error) {
          console.log("Error opening file: ", error);
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end("Internal Server Error");
        }
      } else if (url === "/about") {
        try {
          const fileHandler = await fs.open("index.html", "r");

          const readStream = fileHandler.createReadStream();

          readStream.on("data", (chunk) => {
            res.writeHead(200, {
              "Content-Type": "text/html",
              "content-length": Buffer.from(chunk).length,
            });
            res.write(chunk);
          });
        } catch (error) {
          console.log("Error opening file: ", error);
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Internal Server Error");
        }
      } else {
        res.writeHead(404);
        res.end("endpoint not found");
      }

      break;

    case "POST":
      let bodyData = "";
      if (url === "/api/products") {
        //read from the database file
        let fileHandler;
        let fileContent = "";
        let products;

        try {
          fileHandler = await fs.open("db.json", "r");
          fileContent = await fileHandler.readFile({ encoding: "utf-8" });
          products = JSON.parse(fileContent);
          await fileHandler.close();
        } catch (error) {
          console.log(error);
        }

        // * Reading from the request body data
        req.on("data", (chunk) => {
          bodyData += chunk.toString("utf-8");
        });

        req.on("end", async () => {
          try {
            const product = JSON.parse(bodyData);
            const { name, category, description, price } = product;
            const productId = products["products"].length + 1;

            // adding the product in the database
            products["products"].push({ id: productId, ...product });

            // saving to the database
            await fs.writeFile(
              "db.json",
              JSON.stringify(products, null, 2),
              "utf-8"
            );
            const responseData = {
              message: "New product added in the list.",
              product,
            };

            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(responseData));
          } catch (error) {
            console.log(error);
            res.end("Something went wrong");
            fileHandler.close();
          }
        });
      }
      break;

    case "PATCH":
      if (url === "/api/products") {
        try {
          console.log("Here 1");
          const fileHandler = await fs.open("db.json", "r");
          const fileContent = await fileHandler.readFile({ encoding: "utf-8" });
          const products = JSON.parse(fileContent);
          await fileHandler.close();

          let bodyData = "";

          req.on("data", (chunk) => {
            console.log("reading file");
            bodyData += chunk.toString("utf-8");
          });

          req.on("end", async () => {
            try {
              console.log("reading done of request");
              const updatedProduct = JSON.parse(bodyData);
              const { id } = updatedProduct;

              if (!id) {
                return res.end("Id required to choose which one to update.");
              }

              const index = products["products"].findIndex(
                (product) => product.id === id
              );

              if (index === -1) {
                res.writeHead(404, {
                  "Content-Type": "application/json",
                });
                return res.end(
                  JSON.stringify({
                    message:
                      "Product not found for the given id select another.",
                  })
                );
              }

              // update the product details
              products["products"][index] = {
                ...products["products"][index],
                ...updatedProduct,
              };

              await fs.writeFile(
                "db.json",
                JSON.stringify(products, null, 2),
                "utf-8"
              );

              const responseData = {
                message: "Product updated successfully.",
                product: products["products"][index],
              };

              res.writeHead(200, {
                "Content-Type": "application/json",
              });

              return res.end(JSON.stringify(responseData));
            } catch (error) {
              console.log(error);
              res.writeHead(500);
              res.end("Internal Server Error");
            }
          });
        } catch (error) {}
      }

      break;

    case "DELETE":
      try {
        const fileHandler = await fs.open("db.json", "r");
        const fileContent = await fileHandler.readFile({
          encoding: "utf-8",
        });
        await fileHandler.close();
        const products = JSON.parse(fileContent)["products"];

        // TODO: if there the body is not sent then error will occur
        let bodyData = "";

        req.on("data", (chunk) => {
          bodyData += chunk.toString("utf-8");
        });

        req.on("end", async () => {
          try {
            const { id } = JSON.parse(bodyData);

            if (!id) {
              res.writeHead(400);
              return res.end(
                "Id needed to choose which one to delete from the list."
              );
            }

            const index = products.findIndex((product) => {
              return product.id === id;
            });

            const removedProduct = products.splice(index, 1);

            await fs.writeFile(
              "db.json",
              JSON.stringify(products, null, 2),
              "utf-8"
            );

            const responseData = {
              message: "Item deleted successfully",
              removedProduct,
            };

            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(responseData));
          } catch (error) {
            console.log(error);
            res.writeHead(400);
            res.end("No body sent.");
          }
        });
      } catch (error) {
        console.log(error);
        res.writeHead(500);
        res.end("Internal server error");
      }
      break;

    default:
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write("404 not found");
      res.end();
  }
});

server.listen(8080, () => {
  console.log(`server is running on http://localhost:8080`);
});
