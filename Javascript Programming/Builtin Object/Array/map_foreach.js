const students = ["John", "Jane", "Jack", "Jill"];

// for each function iterates over each element of the array
students.forEach((student, index, array) => {
  console.log("Student array: ", array);
  console.log(`${index}: ${student}`);
  // 0: John
  // 1: Jane
  // 2: Jack
  // 3: Jill
});

// map function iterates over each element of the array and returns a new array
const studentWithIndex = students.map((student, index, array) => {
  return `${index + 1}: ${student}`;
});
console.log(studentWithIndex);
// [ '1: John', '2: Jane', '3: Jack', '4: Jill' ]
