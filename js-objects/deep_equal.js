/**
 * Takes two values and returns true only if they are the same value
  or are objects with the same properties, where the values of
  the properties are equal when compared with a recursive
  call to deepEqual
  * @param thing1 value of any type or object
  * @param thing2 value of any type or object
 */
function deepEqual(thing1, thing2) {
  if (
    typeof thing1 === "object" &&
    thing1 !== null && // do checks for null because of the bug in JS where typeof null returns "object"
    typeof thing2 === "object" &&
    thing2 !== null
  ) {
    // first there has to be the same number of keys
    if (Object.keys(thing1).length === Object.keys(thing2).length) {
      for (const key in thing1) {
        // then we have to make sure thing2 has the same key
        if (thing1.hasOwnProperty(key) && !thing2.hasOwnProperty(key)) {
          return false;
        } // make sure both objects have the same keys and that they are not inherited from other objects
        else if (thing1.hasOwnProperty(key) && thing2.hasOwnProperty(key)) {
          // if the value at that key is a nested object, we need to recurse
          if (
            typeof thing1[key] === "object" &&
            thing1[key] !== null &&
            typeof thing2[key] === "object" &&
            thing2[key] !== null
          ) {
            return deepEqual(thing1[key], thing2[key]);
          }
          // if the value at that key is a primitive type, we use the strict equality operator to compare
          if (thing2[key] !== thing1[key]) {
            return false;
          }
        }
      }
      return true;
    } // if one of the values is null and the other is an object return false
    else {
      return false;
    }
  } // the values are not objects and can be compared with the strict equality operator
  else {
    return thing1 === thing2;
  }
}

// BASIC TESTING

const obj1 = { example: "is", an: "object" };
const obj2 = { example: "is", an: "object" };

const obj3 = { nested: { stats: [1] } };
const obj4 = { nested: { stats: [1] } };

const val1 = null;
const obj5 = { nested: { stats: 300 } };
const num = 42;
const str = "wallagabaloo";

const arr1 = [
  { object: 1, dog: "woof" },
  { object: 2, cat: "meow" },
];
const arr2 = [
  { object: 1, dog: "woof" },
  { object: 2, cat: "meow" },
];

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj3, obj4));
console.log(deepEqual(val1, obj1));
console.log(deepEqual(obj4, obj5));
console.log(deepEqual(num, str));
console.log(deepEqual(arr1, arr2));
