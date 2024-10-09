// variables has local and global scope.
// if we have two variable with the same name, one is global and the other is inside the function closure.
// if we want to get the variable value which is inside the function closure we use bind() function.

const hello = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = hello.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(hello);
console.log(boundGetX());
// Expected output: 42
