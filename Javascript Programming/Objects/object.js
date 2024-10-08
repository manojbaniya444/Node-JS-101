const student = {
  name: "John",
  age: 32,
  greet() {
    console.log(`Hello my name is : ${this.name}`);
  },
  bio() {
    console.log(`Hi I am ${this.name} and ${this.age} years age.`);
  },
};

for (const key in student) {
  console.log(key);
  console.log(student[key]);
  // name, age , gree, bio
}

for (const [key, value] of Object.entries(student)) {
  console.log(key, value);
  // name John, age 32, greet [Function: greet], bio [Function: bio]
}

console.log(Object.entries("hello")); // [ [ '0', 'h' ], [ '1', 'e' ], [ '2', 'l' ], [ '3', 'l' ], [ '4', 'o' ] ]
