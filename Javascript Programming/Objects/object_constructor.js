// Constructors
function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.introduceSelf = function () {
    console.log(`Hi Iam ${this.name}`);
  };
  return obj;
}
// this function creates and returns a new object each time we call it
const john = createPerson("John");
john.introduceSelf(); // Hi Iam John
const jane = createPerson("Jane");
jane.introduceSelf(); // Hi Iam Jane

// but not the approach to create object
// use the constructor
function Person(name) {
  this.name = name;
  this.introduceSelf = function () {
    console.log(`Hi I am ${this.name}`);
  };
}
const john2 = new Person("John");
john2.introduceSelf(); // Hi I am John
const jane2 = new Person("Jane");
jane2.introduceSelf(); // Hi I am Jane