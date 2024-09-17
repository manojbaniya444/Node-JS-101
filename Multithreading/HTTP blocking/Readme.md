## HTTP BLocking Request

Many times we have routes in our application which is CPU Intensive. When user request in such routes then it might take several seconds or minutes even hours to complete processing that task. If we dont care on such routes and just leave it then our server will be blocked when such route is requested by the user and other user cannot access other routes.

This contain the code to handle what to do when there exist such route which is CPU Intensive and takes minutes or hours to complete as in `/generate-prime` route which takes several minutes or hours to complete depending on the number of primes requested by the client. In such case a simple `**GET: "/"` route will be blocked by that generate prime route and the service will not be available to other users.

> The code part where the server takes the generate-prime route.

[Heavy HTTP blocking route](blockingApp.js)

```javascript
if (req.url === "/generate-prime") {
  const startTime = performance.now();
  // this takes several seconds to complete
  const primeNumbers = generatePrimes(
    (count = 200),
    (startingNumber = 100_000_000_000_000)
  );
  const endTime = performance.now();
  const timeElapsed = endTime - startTime;

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ prime: primeNumbers, timeTaken: timeElapsed }));
}
```

In this case when a user hit the `/generate-prime` route other user simply accessing the `"/"` home route need to wait for that route to complete.

```javascript
// this simple route will be blocked by the heavy generate prime route
if (req.url === "/") {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ message: "Hi from the server." }));
}
```

## Possible Solutions

To solve this we can perform:

### Running the app in `Cluster Mode` forking or spawning process (scaling)

Even if we run our app in cluster mode lets say we spawn 2 node js process and scale to handle more but all it takes is two users requesting that `generate-prime` route to request simultaneously to block the whole server. So even spawning more process will not help us in this case.

## The solution using worker thread.

We can assign the CPU Intensive task to worker threads and not block the main thread in which server is running so other routes are free to serve by the server even if the `generate-prime` is used by other.

```javascript
if (req.url === "/generate-prime") {
  const startTime = performance.now();
  let primeNumbers = [];

  const worker = new Worker("./thread.js", {
    workerData: {
      count: 200,
      startingNumber: 100_000_000_000_000,
    },
  });

  worker.on("message", (primeNumbers) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const endTime = performance.now();
    const timeElapsed = endTime - startTime;
    res.end(
      JSON.stringify({
        prime: primeNumbers,
        timeTaken: timeElapsed,
      })
    );
  });
}
```
