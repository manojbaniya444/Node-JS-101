const fruits = [];
fruits.push("banana", "apple", "peach");
console.log(fruits.length); // 3

fruits[5] = "mango";
console.log(fruits[5]); // mango
console.log(fruits);
// [ 'banana', 'apple', 'peach', <2 empty items>, 'mango' ]

Object.keys(fruits).forEach((index) => console.log(index)); // 0, 1, 2, 5

// increasing the length increase size without even adding undefined and decreasing the length delete element
fruits.length = 2;
console.log(fruits); // [ 'banana', 'apple' ]

fruits.reverse(); // [ 'apple', 'banana' ]

const colors = ["red", "green", "blue"];
colors[5] = "yellow";
const iterator = colors.keys();
for (const key of iterator) {
  console.log(`${key}: value -> ${colors[key]}`);
}

// join
const elements = ["Fire", "Air", "Water"];
const elementsString = elements.join(", ");
console.log(elementsString); // Fire, Air, Water

// get index
const indexOfAir = elements.indexOf("Air"); // -1 if no element
console.log(indexOfAir); // 1
elements.push("Land");
elements.pop();

// remove multiple items from array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const start = 2; // start from index 2
const deleteCount = 3; // remove 3 elements after including index 2
const removedNumbers = numbers.splice(start, deleteCount);
console.log(removedNumbers); // [ 3, 4, 5 ]

// negative splice
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const startNegative = -3; // start from end 3 elements
const deleteCountNegative = 2; // remove 2 elements then
const removedNegative = myFish.splice(startNegative, deleteCountNegative);
console.log(removedNegative); // [ 'clown', 'mandarin' ]

// shift: remove the first element
// unshift: add element to the start
const course = ["React", "Angular", "Vue"];
const firstElement = course.shift();
console.log(firstElement); // React
console.log(course); // [ 'Angular', 'Vue' ]
course.unshift("Svelte");
console.log(course); // [ 'Svelte', 'Angular', 'Vue' ]

// removing a single item by with index
const months = ["Jan", "March", "April", "June"];
const startIndex = months.indexOf("March");
const deleteCountSingle = 1;
const removedSingle = months.splice(startIndex, deleteCountSingle);
console.log(removedSingle); // [ 'March' ]
console.log(months); // [ 'Jan', 'April', 'June' ]

// remove multiple items in array
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const removedDays = days.splice(2, 3); // start from Tue and remove 3 from Tue
console.log(removedDays); // [ 'Tue', 'Wed', 'Thu' ]
