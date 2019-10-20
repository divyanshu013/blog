---
title: 'Functional programming constructs'
description: 'Functional programming concepts in JavaScript'
date: 2019-10-11
categories: ['javascript', 'functional-programming']
ogImage: ./og-image.png
---

[Functional programming](https://en.wikipedia.org/wiki/Functional_programming) is a **declarative programming paradigm** that focuses on **composition** using **pure functions**. It **avoids mutation** of state and side-effects (instead encouraging us to **isolate side effects** and make them more predictable in the code).

I've recently started to dive deeper into functional programming and was quite elated to know functional programming has its roots in [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus). A lot of techniques and terms in functional programming are derived from mathematics _(perhaps I should have paid more attention to engineering mathematics at college)_.

## Why functional programming?

Functional programming aims at making code more readable and understandable. We spend more time reading code than writing it, which justifies the returns to me.

> Code that you cannot trust is code that you do not understand
>
> — [Kyle Simpson](https://twitter.com/getify)

Consider an expression using the `map` keyword. Same logic can be written using a `for` loop, however with the `for` loop we've to read through the entire block to figure out what it does, condition for breaking out of the loop and the values being changed (mutated) inside the `for` loop. When using a `map` a lot of this is implicitly understood by the programmer, therefore less code to read. For example:

```js
// Create a new array from an existing array incrementing each value by 1
// [1, 2, 3] -> [2, 3, 4]

const originalArray = [1, 2, 3];

// First approach using a loop
let newArray = [];
// Note: don't use for...in for iterating over arrays since it returns array indices unordered
for (let value of originalArray) {
	newArray.push(value + 1);
}
console.log(newArray); // [2, 3, 4]

// Second approach using a functional construct
const anotherArray = originalArray.map(value => value + 1);
console.log(anotherArray); // [2, 3, 4]
```

You might prefer the first approach if you're used to writing imperative languages such as Python. I prefer the second approach since its concise and easier to understand. Over time I've come to appreciate the beauty of functional programming.

> Best code is code you didn't have to read
>
> — [Kyle Simpson](https://twitter.com/getify)

## Relation with lambda calculus

In the beginning, I mentioned functional programming has its roots in lambda calculus, and JavaScript supports all of the following **lambda calculus constructs**:

1. Functions are always **anonymous**.
2. Functions accept a **single input** (unary).
3. Functions are **first class**. They can receive other functions as input and return other functions as output.

Just using a `function` keyword doesn't necessarily implies a functional programming approach. Functional programming uses functions in the **mathematical sense**.

A function in mathematical sense always **has an input and output**, otherwise its better termed as a **procedure**.

### Functional nature of JavaScript

The above lambda calculus concepts are not restrictions of functional programming itself. For example:

1. You may still have named functions (since JavaScript supports both named and anonymous functions).
2. It's also fine to have functions that accept multiple inputs.
3. JavaScript also has a first class support for functions.

JavaScript is a [multi paradigm language](https://en.wikipedia.org/wiki/JavaScript). It was originally inspired from [scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29), therefore explaining its roots in functional nature.

## Functional programming constructs

A few concepts are important in the land of functional programming.

### Declarative and imperative

Functional programming is **relatively more declarative**. Imperative code is focused on **how** to do something. Declarative code is focused on describing **what** the code does. If you recall the above example, using a `map` keyword to generate an array of values is **relatively more declarative** than imperatively writing the logic using a `for...of` loop.

### Composition

Composition is combining multiple functions together. Functions can be combined in different ways to achieve different tasks. A very simple example of composition:

```js
// Create a new array from an existing array incrementing each value by 1 and multiplying by 2
// [1, 2, 3] -> [4, 6, 8]

const add1 = num => num + 1;
const mul2 = num => num * 2;

// compose a new function using the above two
// note the order of function invocation matters
const addAndMultiply = num => mul2(add1(num));

// use the composed function
const array = [1, 2, 3].map(num => addAndMultiply(num)); // [4, 6, 8]

// or we can simplify it even more by eliminating the num parameter (make it point-free)
const anotherArray = [1, 2, 3].map(addAndMultiply); // [4, 6, 8]
```

The biggest benefit of composition is it leads to better abstractions. Composition also leads to clearer code and reusability as compared to classical inheritance based approach. Here's a quote from the [Functional Light JavaScript](https://github.com/getify/Functional-Light-JS) book, which has become my favorite explanation for abstraction:

> ... abstraction is a process by which the programmer associates a name with a potentially complicated program fragment, which can then be thought of in terms of its purpose of function, rather than in terms of how that function is achieved.
>
> By hiding irrelevant details, abstraction reduces conceptual complexity, making it possible for the programmer to focus on a manageable subset of the program text at any particular time.
>
> — **Michael L. Scott, Programming Language Pragmatics**

### Mutation and side effects

Functional programming avoids mutation of state and side effects. These may include modifying variables outside the scope of function, database or network operations, DOM manipulation and even using random numbers.

#### Mutation

Functional programming favors **value immutability**. Whenever we need to change the state in a program, we should create and track a new value for the state (instead of mutating the existing one).

#### Side effects

Its impossible to do anything useful in a software without doing any side effects, the existence or non existence of such a software would be equivalent. Instead, functional programming encourages us to make such side effects **more obvious** and **isolated**.

One of the ways of achieving this is by **favoring pure functions over impure**. A pure function doesn't rely on external factors and doesn't cause any side effects. Side effects are instead isolated and handled with impure functions. For example:

```js
// a pure function - no side effects
const sum = (a, b) => a + b;

let GLOBAL_STATE = {};

// isolate side effects
function handleSideEffects() {
	// database operations
	// I/O operations
	// DOM manipulations
	// mutate global state
	// ...
}
```

## Closing thoughts

This is the first post in the functional programming series. Stay tuned for future posts as I share my learnings.

## External resources

Following **free resources** are worth checking out if you would like to learn more about functional programming:

1. [Functional Light JavaScript](https://github.com/getify/Functional-Light-JS)
2. [Composing Software](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc)
3. [Mostly Adequate Guide to Functional Programming](https://github.com/MostlyAdequate/mostly-adequate-guide)

Following JavaScript libraries provide a lot of functional utilities:

1. [RamdaJS](https://ramdajs.com/)
2. [Lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide)
