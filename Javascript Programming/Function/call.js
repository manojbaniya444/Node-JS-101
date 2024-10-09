function setUser(username) {
  const user = { username };
  this.username = username;
  return user;
}

// with constructor
const user1 = new setUser("John");
console.log(user1.username);

// without constructor
const user2 = setUser("Jane");
console.log(user2.username);

// call example
function setUsername(username) {
  this.username = username;
  console.log("setusername call");
}

function createUser(username, email, password) {
  // current execution context to the new object
  setUsername.call(this, username); // reference
  this.email = email;
  this.password = password;
}

const user3 = new createUser("John", "john@gmail.com", "123456");
console.log(user3);
