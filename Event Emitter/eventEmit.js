// ?The Event Emitter is a module that facilitates communication/interaction between objects in Node. Event emitter is the core of Node asynchronous event-driven architecture. Many of Node's built in modules iherit from Event Emitter including prominent frameworks like Express.js


const EventEmitter = require("events")

// new event instance
const myEvent = new EventEmitter()

// here we are setting our custom event "foo" which can be emitted later
myEvent.on("foo", () => {
    console.log("An event foo occured just now.")
})

// here emitting the event "foo"
myEvent.emit("foo")