# Realine

> The node:readline module provides an interface for reading data from a Readable stream such as process.stdin one line at a time.

const readline = require("node:readline/promises")

const readline = require("node:readline")

## EVENT: 'close'

- when the Interface is closed by any of the possible methods like rl.close(), ctrl + D, ctrl + D or 'end' event

## EVENT: 'line'

- when input is received

## EVENT: 'history'

- The 'history' event is emitted whenever the history array has changes.
- returns array containing the history.

## EVENT: 'pause'

- When the input stream is paused
- It receives 'SIGCONT' event

## EVENT: 'resume'

- When the input stream is resumed.

## EVENT: 'SIGINT'

- whenever the input stream receives ctrl + C
- if no 'sigint' event is registered then the 'pause' event will be emitted.

> rl.question is a method provided by 'readline' and is used specifically to ask the user a question and wait for their response whereas rl.setPrompt and rl.prompt is used in combination to get the message and display the promt in command line without waiting for the answer

After using rl.prompt we typically use event listeners to capture and handle user input after calling rl.prompt
