---
title: 'Temporal Dead Zone'
description: 'Temporal Dead Zone (TDZ) for block scoped variables in JavaScript'
date: 2019-08-16
categories: ['javascript']
ogImage: ./og-image.png
---

When a block scoped variable (`let` or `const`) is declared, and before it's initialized, it remains in a state called the [**Temporal Dead Zone (TDZ)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone). While in this state, the variable can't be accessed and will throw a `ReferenceError`.

```js
console.log(a); // undefined
console.log(b); // ReferenceError
var a = 13;
let b = 42;
```

Same is true for `const`. The `typeof` operator also throws a `ReferenceError` when a variable is in TDZ.

```js
console.log(typeof undeclaredVariable); // undefined
console.log(typeof c); // ReferenceError
let c = 3;
```

## Hoisting

From the above examples, it appears as if the block scoped variables, unlike `var`, are not [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting). However, that is not true. `let` and `const` declarations are also hoisted to the lexical scope. They remain in the TDZ till they're initialized.

```js
let blockVariable = 7;

{
	// blockVariable declaration will be hoisted to this lexical scope
	console.log(blockVariable); // ReferenceError
	let blockVariable = 8;
}
```

From this example, we might expect the `console.log` to print `7`. However, the declaration of `blockVariable` in the inner scope is hoisted to the lexical scope which puts it in a state of TDZ when the `console.log` is executed.

## Need for TDZ

Block scoped variables `let` and `const` work differently from `var`. Any `var` variables are hoisted and initialized with a value of `undefined`. For `let` and `const`, initialization with `undefined` doesn't happen with hoisting.

TDZ primarily exist to satisfy the constraints of `const`. `const` signifies that the variable can't be reassigned to a different value. If `const` worked in the same way as `var`, it would have implied the variable to have two values, an `undefined` when hoisted and later the value with which it would have been initialized with. Consider the following:

```js
// if constantVariable would have assigned undefined when hoisted
// like var, it would have to be reassigned to 99 later
// which would be against the constraints of const

console.log(constantVariable); // ReferenceError
const constantVariable = 99;
```

`let` follows the same semantics for TDZ as `const` to make this behavior similar. This also helps in avoiding possible bugs which might have arrived from accessing variables before they were initialized.

### External links

- [Temporal Dead Zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone)
- [Why is there a Temporal Dead Zone](https://2ality.com/2015/10/why-tdz.html)
