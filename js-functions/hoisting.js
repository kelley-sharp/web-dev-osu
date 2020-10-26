// calling a function before function is defined works because of hoisting
var result = isEven(3);

function isEven(x) {
  return x % 2 == 0;
}

// the following returns "false"
console.log(result);

// when function is stored in a variable, function declaration does not hoist when called before variable defined
var result2 = isOdd(42);

var isOdd = function (x) {
  return x % 2 != 0;
};

// the following returns "TypeError: isOdd is not a function"
console.log(result2);
