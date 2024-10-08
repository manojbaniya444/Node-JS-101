// Closure: A combination of a function bundled together with references to its surrounding state environment (Lexical).
// A closure gives a function access to its outer scope. Closure is created every time a function is created at function creation time.

function init() {
  let name = "John"; // a local variable

  function displayName() {
    // innerfunction that forms a closure
    console.log(name);
  }
  // example of lexical scoping
  displayName();
}
init(); // John

// scoping with let and const variable.
// before ES6: there were only function scope and global scope.
// variable declared with var are either function scoped or global scoped depending on whether they are declared inside or outside a function.
// tricky because blocks with curly braces do not create scope for var.

if (Math.random() > 0.5) {
  var x = 1;
} else {
  var x = 2;
}
console.log(x);
// no error because block dont create scope for var and the var statement actually here create a global variable.

if (Math.random() > 0.5) {
  const y = 1;
} else {
  const y = 2;
}
// console.log(y); // error
// here in const and let blocks are treated as scope but only if we declare variable with let or const.

function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
