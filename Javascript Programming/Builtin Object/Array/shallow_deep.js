// shallow and deep copy
// shallow copy: rest operator, Array.from(), slice()
const fruits = ["apple", "banana", { name: "peach" }];
const shallowFruitCopy = [...fruits];

// only top level properties are copied nested are referenced.
shallowFruitCopy[0] = "kiwi";
shallowFruitCopy[2].name = "mango";

console.log("original fruit array", fruits); // [ 'apple', 'banana', { name: 'mango' } ]
console.log("shallow copied fruit array", shallowFruitCopy); // [ 'kiwi', 'banana', { name: 'mango' } ]

// deep copy: JSON.parse(JSON.stringify())
const animals = ["cat", "dog", { name: "elephant" }];

// deep copy totally independent of original array
const deepAnimalCopy = JSON.parse(JSON.stringify(animals));
deepAnimalCopy[0] = "lion";
deepAnimalCopy[2].name = "tiger";
console.log("original animal array", animals); // [ 'cat', 'dog', { name: 'elephant' } ]
console.log("deep copied animal array", deepAnimalCopy); // [ 'lion', 'dog', { name: 'tiger' } ]

// assiging array to another variable will reference to the original array
const originalArray = ["apple", "banana", { name: "peach" }];
const arrayReference = originalArray;
// referenced array change will change everything
arrayReference[0] = "kiwi";
arrayReference[2].name = "mango";
console.log("original array", originalArray); // [ 'kiwi', 'banana', { name: 'mango' } ]
console.log("array reference", arrayReference); // [ 'kiwi', 'banana', { name: 'mango' } ]
