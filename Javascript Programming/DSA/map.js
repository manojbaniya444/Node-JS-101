// Creating a Map with initial key-value pairs
const mapWithValues = new Map([
  ["key1", "valu1"],
  ["key2", "value2"],
]);

// log the initial map
console.log(mapWithValues);

// setting a new key value to the map
mapWithValues.set("key3", "value3");

// after setting a new key and value
console.log(mapWithValues);

// get the specific value with the key
console.log(mapWithValues.get("key3"));

// deleting the pair
mapWithValues.delete("key1");

// checking if the key exists
console.log(mapWithValues.has("key3"));

console.log(mapWithValues.size);

// clear the map
mapWithValues.clear();

console.log(mapWithValues);

console.log("_____________NEW MAP______________________");

const map = new Map();

map.set("name", "John Doe");
map.set("subjects", ["Economics", "Biology"]);
map.set(["a", "b"], true);

console.log(map);

// iterating over map key pairs
map.forEach((value, key) => {
  console.log(`${key} : ${value}`);
});

console.log("_________________FOR LOOP____________________");
// using for loop
for (const [key, value] of map) {
  console.log(`${key} : ${value}`);
}

console.log("__________________ITERATING OVER KEYS___________________");
for (const key of map.keys()) {
  console.log(key);
}

for (const value of map.values()) {
  console.log(value);
}

for (const entry of map.entries()) {
  console.log(entry);
}
