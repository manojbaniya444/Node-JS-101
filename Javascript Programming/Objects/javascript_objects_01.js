// an empty object
const myobject = {};
console.log(myobject); // {}

// creating a person object
const person = {
  name: ["John", "Doe"],
  age: 32,
  bio: function () {
    console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`);
  },
  introduceSelf: function () {
    console.log(`Hi, I'm ${this.name[0]}`);
  },
};
person.name; // ["John", "Doe"]
person.age; //32
person.bio(); // John Doe is 32 years old.
person.introduceSelf(); // Hi, I'm John

// simple syntax when object member is function
const employee = {
  name: "Jane",
  age: 20,
  // shorter syntax to write function
  bio() {
    console.log(`${this.name} is ${this.age} years old.`);
  },
  introduceSelf() {
    console.log(`Hello I am ${this.name}`);
  },
};
employee.bio(); // Jane is 20 years old.
employee.introduceSelf(); // Hello I am Jane

// dot operator
const animal = {
  type: {
    species: "Dog",
    breed: "Golden Retriever",
  },
};
animal.type; // {species: "Dog", breed: "Golden Retriever"}
animal.type.species; // Dog
console.log(animal.type["breed"]); // Golden Retriever

// log
const person2 = {
  name: ["John", "Doe"],
  age: 32,
};
function logProperty(propertyName) {
  console.log(person2[propertyName]);
}
logProperty("name"); // ["John", "Doe"]
logProperty("age"); // 32

// setting object member
const newPerson = {};
newPerson.age = 33;
newPerson.name = "Jane";
newPerson.bio = function () {
    console.log(`${this.name} is ${this.age} years old.`);
}
newPerson.bio(); // Jane is 33 years old.

// what is this keyword in object
// this keyword refer to the current object the code is being executed in. In the context of an object method. In object method it refer to the object that the method was called on.
