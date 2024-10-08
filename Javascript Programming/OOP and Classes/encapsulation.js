class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi my name is ${this.name}`);
  }
}

class Professor extends Person {
  teaches;

  constructor(name, teaches) {
    super(name);
    this.teaches = teaches;
  }

  introduceSelf() {
    console.log(`My name is ${this.name}, and i will teach ${this.teaches}`);
  }

  grade(paper) {
    const grade = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(grade);
  }
}

class Student extends Person {
  #year;

  constructor(name, year) {
    super(name);
    this.#year = year;
  }

  #getInfo() {
    console.log("Hey i am a student.");
  }

  introduceSelf() {
    console.log(`Hi i am ${this.name} and i am in ${this.#year}`);
  }

  canStudyAlgebra() {
    return this.#year > 1;
  }
}

const john = new Student("John", 2);

john.introduceSelf(); // Hi i am John and i am in 2
john.canStudyAlgebra(); // true
// console.log(john.#year); // error
// john.#getInfo(); error
