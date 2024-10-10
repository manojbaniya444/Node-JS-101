// ?In javascript, functions are treated as objects.
// *> They can be stored in a variable
// *> They can pass as value
// *> Return them as a value

// ? Function as a value
var func = function print() {
  console.log("Hello world");
};

func(); // Hello world
console.log(func); // [Function: print]

// ? Function as a parameter
function printResult(value) {
  console.log("Print resulot: " + value);
}
function mul(a, b, fxn) {
  let mul = a * b;
  fxn(mul);
}
mul(2, 3, printResult); // Print resulot: 6

// ? Function as a return value
function outer(outerValue) {
  function inner(value) {
    console.log(`Inner value: ${value} and outer value: #${outerValue}`);
  }
  return inner;
}
outer("inner")("outer"); // Inner function

console.log(typeof outer); // function

// ? Function as Object property
function student() {
  this.name = "John";
  this.age = 20;
  this.print = function () {
    console.log(this.name + " " + this.age);
  };
}
const a = new student();
console.log(typeof a); // object
console.log(a.name); // John
a.message = function () {
  console.log("Hello");
};
a.message(); // Hello

const b = new student();
console.log(b.name); // John
// b.message(); // Error
