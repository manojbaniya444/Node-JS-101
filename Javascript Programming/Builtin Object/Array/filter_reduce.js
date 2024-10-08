// filter create a new array with all elements that pass the test implemented by the provided function.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evenNumbers = numbers.filter((number) => {
  return number % 2 === 0;
  // [ 2, 4, 6, 8 ]
});
console.log(evenNumbers);

// reduce executes a reducer function on each element of the array, resulting in a single output value.

const array = [1, 2, 3, 4];

const initialValue = 0;
// [].reduce(function, initialValue)
const sumWithInitialValue = array.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);
console.log(sumWithInitialValue); // 10

const getMax = (a, b) => Math.max(a, b);
[1, 100].reduce(getMax, 500); // 500
console.log([1, 100].reduce(getMax, 10)); // 100

const cartItems = [
  { name: "apple", price: 10 },
  { name: "orange", price: 20 },
  { name: "banana", price: 30 },
];

const sumCart = cartItems.reduce((accumulator, currentValue) => {
  const sum = accumulator + currentValue.price;
  return sum;
}, 0);
console.log(sumCart); // 60
