const path = require("node:path");

function getBaseName(__filename) {
  return path.basename(__filename);
}

function getDirName(__filename) {
  return path.dirname(__filename);
}

function getExtName(__filename) {
  return path.extname(__filename);
}

function formatPath() {
  path.format({
    dir: "C:UsersacerDesktopUNCCPath",
    base: "file.txt",
  });
}

function checkAbsolutePath(pathname) {
  return path.isAbsolute(pathname); // boolean
}

function joinPath() {
  path.join("/dir1", "file", "abc");
  // returns /dir1/file/abc
}

function parsePath() {
  // returns an object whose properties represent significant elements of the path.

  path.parse("/home/user/dir/file.txt");
}

function getRelativePath(from, to) {
  path.relative(from, to);
  // this method returns the relative path from to to based on the current working directory.

  //     > path.relative("./files/file.txt", "./")
  // '..\\..'
  // > path.relative("./files/file.txt", "../")
  // '..\\..\\..'
  // > path.relative("./files/file/file.txt", "../")
  // '..\\..\\..\\..'
  // > path.relative("./", "../")
  // '..'
  // > path.relative("./", "../../")
  // '..\\..'
}

function getAbsolutePath() {
  path.resolve("./");
  //'C:\\Users\\acer\\Desktop\\UNCC\\Path'
}

function splitPath() {
  "foo/bar/baz".split(path.sep);
}
console.log("Directory: ", getDirName("./files/file.txt"));
console.log("BaseName: ", getBaseName("./files/file.txt"));


console.log(path.join(__dirname, "files"))
console.log(path.resolve("./files"))