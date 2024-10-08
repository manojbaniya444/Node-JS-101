// defining class
class Person {
  // property
  name;
  // constructor
  constructor(name) {
    this.name = name;
  }
  // method of the class
  introduceSelf() {
    console.log(`Hello my name is ${this.name}`);
  }
}

// inheritance
class Professor extends Person {
  // property
  teaches;
  // constructor class of the child class Professor
  constructor(name, teaches) {
    super(name);
    this.teaches = teaches;
  }
  // method of the child class Professor
  grade(paper) {
    console.log(`Professor ${this.name} grades ${paper}`);
  }
  introduceSelf() {
    console.log(`Hello my name is ${this.name} and I teach ${this.teaches}`);
  }
}

// another child class inheriting from Person
class Student extends Person {
  // property
  year;
  // constructor
  constructor(name, year) {
    super(name);
    this.year = year;
  }
  // method of Student
  introduceSelf() {
    console.log(`Hello my name is ${this.name} and I am in year ${this.year}`);
  }
}

const john = new Professor("John", "Math");
john.introduceSelf(); // Hello my name is John and I teach Math
john.grade("mathematics"); // Professor John grades paper

const jane = new Student("Jane", 3);
jane.introduceSelf(); // Hello my name is Jane and I am in year 3

const harry = new Person("Harry");
harry.introduceSelf(); // Hello my name is Harry
