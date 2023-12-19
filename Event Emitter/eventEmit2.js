const EventEmitter = require("events")

const myEvent = new EventEmitter()

myEvent.on("call", () => {
    console.log("Hi I am First.")
})

myEvent.on("call", () => {
    console.log("Hi I am Second.")
})

myEvent.on("call", (message = "no message now") => {
    console.log("Hi I am Third with message: ", message)
})


// this event will run only for the first time "call" is called and will not run second time as others in above like they are called with second event emit with argument message.
myEvent.once("call", () => {
    console.log("I will only run once.")
})


myEvent.emit("call")
myEvent.emit("call", "Hello world")