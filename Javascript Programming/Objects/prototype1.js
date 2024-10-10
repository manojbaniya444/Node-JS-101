// implementing custom forEach method in array object
console.log(typeof []); // object

Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    // here this[i] is the current element
    // i is the index of the current element
    // this is the array
    callback(this[i], i, this);
  }
};

// getMax property
Array.prototype.getMax = function (callback) {
  let max = this[0];
  for (let i = 1; i < this.length; i++) {
    max = callback(max, this[i]);
  }
  return max;
};

function iterateForEach(element, index, array) {
  console.log("Element: ", element);
}

const myArray = [1, 2, 3, 4, 5];
myArray.myForEach(iterateForEach);
const max = myArray.getMax((a, b) => Math.max(a, b));
console.log(max);

Object.hasOwnProperty("myForEach"); // false
Array.hasOwnProperty("myForEach"); // false
Object.getPrototypeOf(Array); // [Function: Object]