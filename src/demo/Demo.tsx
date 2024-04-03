import React from "react";

interface x {
  name: string;
}
interface y {
  name: string;
  age?: number;
}

let user1: x = { name: "username 1" };
let user2: y = { name: "username 2", age: 10 };

// Define a generic type variable `T`
function identity<T>(value: T): T {
  return value;
}

// Function to get length of an array with generics
function getLength<T>(arr: T[]): number {
  return arr.length;
}

// Usage examples
let str = identity<string>("Hello"); // str will be of type string
console.log(str);

let num = identity(10); // num will be of type number
console.log(num);

// Decorator factory to create a logging decorator
const logProperty = (target: any, key: string) => {
  // Store the original descriptor
  const originalDescriptor = Object.defineProperty(target, key, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  // Define a getter and setter with logging
  const getter = () => {
    const val = [originalDescriptor.key];
    console.log(`Get: ${key} -> ${val}`);
    return val;
  };

  const setter = (newVal: any) => {
    console.log(`Set: ${key} -> ${newVal}`);
    [originalDescriptor.key] = newVal;
  };

  // Redefine the property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
  });
};

class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("Alice");
person.greet(); // Logs "Get: name -> Alice"

person.name = "Bob"; // Logs "Set: name -> Bob"
console.log(person.name); // Logs "Get: name -> Bob"

const Demo = () => {
  return (
    <div>
      <h1>Interface</h1>
      <p>user1 {typeof user1}</p>
      <p>user2 {typeof user2}</p>
      <p>user1 = user2? {user1 === user2 ? "true" : "false"}</p>
      {JSON.stringify((user2 = user1))}

      <h1>Generics</h1>
      <p>identity a string {str}</p>
      <p>identity a number {num}</p>

      <h1>Decorators</h1>
    </div>
  );
};

// "export" keyword is use as a syntax of Modules
export default Demo;
