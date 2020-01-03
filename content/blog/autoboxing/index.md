---
title: 'Auto boxing'
description: 'How are we able to call object methods on primitive values in JavaScript?'
date: 2020-01-03
categories: ['javascript']
ogImage: ./og-image.png
---

In JavaScript, there are different ways to create a string (or any other value for that matter).

```js
const str1 = 'Imagine'; // literal form
const str2 = String('Imagine');
const strObj = new String('Imagine'); // constructor function form
```

We generally prefer the literal form `'Imagine'` when writing code, but how does it differ from other forms listed above? **How can we invoke methods on this primitive value?**

```js
'Imagine'.length; // how are we able to access this property
'Imagine'.toUpperCase(); // or call any other String method

1971.toString(); // this works for other primitive types as well!
```

> **tl;dr**
>
> It works because of **auto-boxing** and a bit of _coercion magic_.

## Primitives and objects

Considering the first example:

```js
const str1 = 'Imagine';
const str2 = String('Imagine');
const strObj = new String('Imagine');
```

Both `str1` and `str2` hold a `string` [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). `strObj` on the other hand holds the (`String`) object equivalent of `string`.

The difference between `str2` and `strObj` initialization is the `new` keyword. When the `String` function is called without a `new` keyword, it returns a primitive value. With a `new` keyword it works as a constructor function and returns a `String` object.

Therefore, `str1` and `str2` are identical (and both are a bit different from `strObj`). Looking at their comparison:

```js
const str1 = 'Imagine';
const str2 = String('Imagine');

console.log(str1 === str2); // true

const strObj = new String('Imagine');

console.log(str1 === strObj); // false
console.log(str1 == strObj); // true
```

A strict equality (`===`) between the literal and object form returns `false` but a coercive equality (`==`) returns `true`. This works since the object form "stores" the primitive value (`'Imagine'`) and was able to coerce itself to the primitive form at the time of equality.

> **Note**
>
> We can also retrieve the primitive value (`string`) from a "wrapper" (`String`) object using the [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) method.

## Boxing values

The above example explains the similarities between primitive and object values. Now, to uncover **auto-boxing**.

Here's a recap, lets look at the types as well this time:

```js
const str1 = 'Imagine';
const strObj = new String('Imagine');

console.log(typeof str1); // 'string'
console.log(typeof strObj); // 'object'
```

All methods and properties are available on the `String` object's prototype (`length`, `toUpperCase`, etc). When we call a method on a primitive type, JavaScript automatically converts _(coerces or auto-boxes)_ the primitive value to its wrapper object, which has access to the methods. This lets us call methods directly on primitive values!

Now, whenever you take a look at this piece of code, you'll be able to understand the _magic_ and beauty behind it 🙂

```js
// string primitive → String object → prototype → toUpperCase
'Imagine'.toUpperCase();
```
