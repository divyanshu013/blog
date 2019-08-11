---
title: 'Negative Zero in JavaScript'
description: ''
date: 2019-08-11
categories: ['javascript']
ogImage: ./og-image.png
---

Classical mathematics has no notion of a negative zero. Zero is often termed **neither positive nor negative**. In computing, however, there is a concept of [signed zero](https://en.wikipedia.org/wiki/Signed_zero).

JavaScript uses the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard to represent numbers, which results in the language having a `-0` and `0`.

> The IEEE 754 standard for floating point arithmetic (presently used by most computers and programming languages that support floating point numbers) requires both **+0** and **−0**. The zeroes can be considered as a variant of the extended real number line such that 1/−0 = −∞ and 1/+0 = +∞, division by zero is only undefined for ±0/±0 and ±∞/±∞.

Although we often don't distinguish between `-0` and `0` in everyday programming, it might be useful for rare cases. For example, a negative zero can be used to express a sense of direction (left or right, up or down). This could also be helpful in representing a moving object on a map (x and y coordinates).

There are certain quirks when working with negative zeros in JavaScript which I'll try to summarize in this post.

## Equality

Although `-0` and `0` should be treated different, the conventional equality operators `==` and `===` treat them as same (according to the [rules of equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)).

```js
const a = 0;
const b = -0;

console.log(a == b); // true
console.log(a === b); // true
```

In order to correctly compare `-0` and `0` we should use the [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) method. `Object.is()` unlike the `==` operator, doesn't coerce and unlike the `===` operator doesn't treat values differently.

```js
const a = 0;
const b = -0;

console.log(Object.is(a, b)); // false
```

`Object.is()` unlike `==` and `===` also treats `NaN` as same.

```js
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(Object.is(NaN, NaN)); // true
```

## Sign

[`Math.sign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) can be used to determine the sign of a number. It also exhibits a different behavior when working with zeroes.

```js
// for non zero values
console.log(Math.sign(13)); // 1
console.log(Math.sign(-13)); // -1

// for zeroes
console.log(Math.sign(0)); // 0
console.log(Math.sign(-0)); // -0
```
