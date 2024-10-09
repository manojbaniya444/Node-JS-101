// static define a stataic method or property for a class which cannot be directly accessed on instances of the class. Instead they are accessed on the class only.

// static method are utility function.
// static property are used to store class level data.

class ClassWithStaticMethod {
  static staticProperty = "static value";

  static staticMethod() {
    return "static method has been called.";
  }

  static staticMethod2() {
    return "static method 2 has been called.";
  }
  static {
    console.log(this.staticMethod2());
    console.log("static block");
  }
}

console.log(ClassWithStaticMethod.staticProperty);
console.log(ClassWithStaticMethod.staticMethod());

const instance = new ClassWithStaticMethod();
console.log(instance.staticProperty); // undefined

// static method2 has been called.
// static block
// static value
// static method has been called.
