// iterating over an array
const fruits = ["apple", "banana", "peach"];
fruits.unshift("mango");

for (const fruit of fruits) {
  console.log(fruit);
}

// forEach
fruits.forEach((fruit) => console.log(fruit));

// merging multiple arrays together
const vegetables = ["carrot", "potato"];
const fruitsAndVegetables = fruits.concat(vegetables);
console.log(fruitsAndVegetables);

// in shallow copy only the top level properties are copied while the nested properties are still referenced to the original object
// copy: shallow copy
// In the top level property the change will only affect the changed array. Only the nested properties will be affected in changing.
const copyFruits = [...fruits];
copyFruits[0] = "kiwi";
console.log("copied fruit array", copyFruits);
console.log("original fruit array", fruits);

// another method
const copyFruits2 = fruits.slice();
const copyFruits3 = Array.from(fruits);

// copy: deep copy
const deepCopyFruits = JSON.parse(JSON.stringify(fruits));

// deep nested copy
let original = [{ a: 1 }, { b: 2 }];
let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy[0].a = 2;
console.log("original", original); // [ { a: 1 }, { b: 2 } ]
console.log("deepCopy", deepCopy); // [ { a: 2 }, { b: 2 } ]
let shallowCopy = Array.from(original);
console.log("Shallow copy", shallowCopy);
shallowCopy[0].a = 99;
console.log("original", original); // [ { a: 99 }, { b: 2 } ]
