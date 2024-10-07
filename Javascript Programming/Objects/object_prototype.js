// Prototype: mechanism by which javascript objects inherit properties and methods from other objects

const myObject = {
  city: "Madrid",
  greet() {
    console.log(`Greetings from ${this.city}`);
  },
};
myObject.greet(); // Greetings from Madrid

console.log(myObject.__proto__); // Object {}
console.log(myObject.toString()); // [object Object]
// it work if it is not obvious what toString()
// Every object in javascript has a built in property which is called its prototype.
// The prototype is itself an object so it will have its own prototype making a prototype chain.
// The chain ends when we reach a prototype that has null.
// When we try to access a property on an object, if the property cant be found in the object itself the prototype is searched and then the prototype of the prototype and so on.

// what is the prototype of myobject?
Object.getPrototypeOf(myObject); // Object {}

console.log("___PrototypeLoop___");
const myDate = new Date();
let object = myDate;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object !== null);
console.log("_______");
// {}
// [Object: null prototype] {}
// null

// shadow property
const myDate2 = new Date(1995, 11, 17);
console.log(myDate2.getTime()); // 819062400000

myDate2.getTime = function () {
  console.log("Hello get time.");
};
myDate2.getTime(); // Hello get time
// this should be predictable given the description of the prototype chain. When we call getTime() the browser first check in myDate for a property with that name, and only check the prototype if it cant find it. In this case it finds the property in myDate so it uses that one.

// setting a prototype
const personPrototype = {
  greet() {
    console.log("Hello");
  },
};
const carl = Object.create(personPrototype);
carl.greet(); // Hello
// carl is a new object with personPrototype as its prototype. This means that carl has access to all the properties and methods of personPrototype.

// in javascript all functions have a property named prototype. when we call a function as a constructor, this property is set as the prototype of the new object.

const objectPrototype = {
  greet() {
    console.log(`Hello my name is : ${this.name}`);
  },
  bio() {
    console.log(`Hi I am ${this.name} and ${this.age} years age.`);
  },
};
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// method 1 to assign prototype
Object.assign(Person.prototype, objectPrototype);
// method 2 to assign prototype
Person.prototype.bio = objectPrototype.bio;

const john3 = new Person("John3", 32);
john3.greet(); // Hello my name is : John3
john3.bio(); // Hi I am John3 and 32 years age.

// own property
// Person has four properties: name, age, greet, bio. The first two are own properties of the object, while the last two are inherited from the prototype.
// this is common to set data property in constructor and method in prototype.
// properties that are directly called like name and age are own property.

console.log(Object.hasOwn(john3, "name")); // true
console.log(Object.hasOwn(john3, "greet")); // false
console.log(Object.hasOwn(john3, "bio")); // false
console.log(Object.hasOwn(john3, "age")); // true