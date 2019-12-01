---
title: 'Function arity and partial application'
description: ''
date: 2019-12-01
categories: ['javascript', 'functional-programming']
ogImage: ./og-image.png
---

**Partial application** is an interesting functional programming technique to _prepare (and simplify) a function_ for future use. More specifically, its a **delegation technique** that lets us create **specialized functions from generalized ones**.

In my previous blog post on [functional programming constructs](/blog/functional-programming-constructs) I wrote about the principles of functional programming and how we adopt them in JavaScript. In this one, I'll continue to expand on those into **partial application**.

## Arity

**Arity** is the number of parameters a function expects. eg:

```js
function sum(a, b) {
	return a + b;
}

console.log(sum.length); // 2 - arity of sum function
```

> There is a slight difference between the terms **arguments** and **parameters**. **Arguments** are the values that are passed to a function whereas, **parameters** are the variables in function definition which receives those values as inputs.

The above example of using the function's `length` property doesn't work always. Here are a few quirks:

```js
function sum1(a, b = 1) {
	return a + b;
}
console.log(sum1.length); // 1 - ignores default parameter

function sumAll(a, ...rest) {
	// sums all values
}
console.log(sumAll.length); // 1 - ignores rest parameter
```

Therefore, for such functions we've to know the arity of the function beforehand in order to use some of the functional programming techniques.

> Generally, functional programming avoids using functions that can accept an indeterminate number of arguments (also called **variadic functions**).

## Working with function inputs

Sometimes reducing the surface area of function inputs can be quite helpful in adopting functional approaches. For example, consider a `unary` utility (also available in functional libraries such as [RamdaJS](https://ramdajs.com/)).

### unary

`unary` is a higher order function which reduces the arity of a provided function to 1. Similarly, there may be any _n-ary_ function to reduce the arity of a function to _n_.

```js
const unary = fn => arg => fn(arg);
```

This may be used in certain situations, for example consider if we were to take an array of serialized numbers and return a parsed array of numbers.

```js
// Convert ['1', '2', '3'] to [1, 2, 3]

// Some libraries have this and many other functional utilities
const unary = fn => arg => fn(arg);

const data = ['1', '2', '3'];

console.log(data.map(parseInt)); // [1, NaN, NaN]

console.log(data.map(unary(parseInt))); // [1, 2, 3]
```

**Why does this happen?** The reason is [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Syntax) invokes the callback (in the first case `parseInt`) with three parameters - current array value, index and the entire array. Since [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Syntax) has an arity of 2 (accepts the string value and radix) the evaluation happens as follows:

```js
// Mapping over the array ['1', '2', '3']
// Here's a simplified version of what happens
// data.map((item, index) => parseInt(item, index))

parseInt('1', 0); // 1
parseInt('2', 1); // NaN
parseInt('3', 2); // NaN

// And here's how the second reduced arity example works
// a unary variant of parseInt would accept only one argument
// data.map((item, index) => parseInt(item))

parseInt('1'); // 1
parseInt('2'); // 2
parseInt('3'); // 3
```

> **Note**
>
> Although I've used `parseInt` example to showcase how reducing arity can be helpful, it's always best to explicitly pass the radix parameter as 10 since it [doesn't default to 10](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Description).

### identity

An identity function take an input and returns it as it is:

```js
const identity = n => n;
```

By itself, it may not look much useful but consider an example where we want to filter out falsy values:

```js
const identity = n => n;

const data = ['a', '', null, undefined, 'b'];

console.log(data.filter(identity)); // ['a', 'b']
```

This works because of [coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion).

`identity` function can also be used as a default transformation function. Consider an arbitrary example:

```js
const add1 = n => n + 1;
const identity = n => n;

// Returns a function that either increments the value or does nothing
const addIfPositive = n => (n > 0 ? add1 : identity);

console.log(addIfPositive(1)(7)); // 8
console.log(addIfPositive(-1)(7)); // 7
```

## Delegating

**Delegation** is a technique in which we only do the minimal required work upfront and leave the rest for later (if and when it's required).

This is often called **lazy evaluation** with respect to functions. When delegating a function, we can specify only some inputs initially and let the function accept the remaining inputs later when needed.

With delegation techniques, we can transform a **generalized function to more specialized** form (by reducing the surface area of function's inputs). A couple of ways to do this are **partial application** and **currying**.

### Partial application

A couple of common functional utilities are `partial` and `partialRight`:

```js
const partial = (fn, ...presets) => (...args) => fn(...presets, ...args);

// partialRight can be used where we want to pass the rightmost arg first
const partialRight = (fn, ...presets) => (...args) => fn(...args, presets);

// An example of partial application
const data = {
	bands: {
		oasis: 'inactive',
		beatles: 'inactive',
		gnr: 'active',
	},
};

// A generalized function
const getValue = (obj, key) => obj[key];

// A specialized function
const getBand = partial(getValue, data.bands);

console.log(getBand('oasis')); // 'inactive'
console.log(getBand('beatles')); // 'inactive'
```

### Currying

The term **currying** has its origin from the mathematician [Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry). This technique is used extensively in purely functional languages such as [haskell](https://wiki.haskell.org/Currying).

> [In Haskell](https://wiki.haskell.org/Currying), all functions are considered curried: That is, all functions in Haskell take just one argument.

**Currying** transforms a function that expects multiple arguments into a chain of functions, each accepting a single argument and returning another function to accept the next argument and so on. An example would make this explanation clearer:

```js
const sum = (a, b, c) => a + b + c;

const sumCurried = a => b => c => sum(a, b, c);

console.log(sum(1, 2, 3)); // 6
console.log(sumCurried(1)(2)(3)); // 6
```

In the above example, both `sum` and `sumCurried` serves the same final purpose, to provide a sum of three values. However, the way of achieving that purpose is different. `sumCurried` is a curried version of the `sum` function which was formed by reducing (or unwinding) the arity of the original `sum` function from 3 to 1 (as a chain of unary functions).

Currying, like partial application also transforms a generalized function to a more specialized one. A key difference between partial application and currying is that `partial` needs to pass all partially applied arguments initially. With currying we can pass subsequent arguments lazily.

```js
const sumCurried = a => b => c => a + b + c;

const add1 = sumCurried(1);
const add2 = add1(2);
const add3 = add2(3);

console.log(add3); // 6
```

> Both currying and partial application use [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

You can find utilities for `curry` in most functional libraries (such as RamdaJS). But here's how you may implement it on your own:

```js
function curry(fn, arity = fn.length) {
	return function curriedFn(...args) {
		if (args.length >= arity) {
			// invoke the original function
			return fn(...args);
		}
		return (...nextArgs) => curriedFn(...args, ...nextArgs);
	};
}

const sum = (a, b, c) => a + b + c;

console.log(curry(sum)(1)(2)(3)); // 6

// Generally we keep curried functions unary but the following also work regardless
console.log(curry(sum)(1)(2, 3)); // 6
console.log(curry(sum)(1, 2, 3)); // 6
```

### Uncurrying

**Uncurrying** transforms a curried function back to its original form.

```js
// transforms sum(1)(2)(3) to sum(1, 2, 3) form
const uncurry = fn => (...args) =>
	args.reduce((nextFn, arg) => nextFn(arg), fn);

const curriedSum = a => b => c => a + b + c;
const sum = uncurry(curriedSum);

console.log(sum(1, 2, 3)); // 6
```

## Further reading

This is the second post I wrote about functional programming. You may check out the [first post](/blog/functional-programming-constructs) which also includes links to free resources. I'll continue to share my learnings on functional programming in future posts.
