---
title: 'Property descriptors, getters and setters'
description: 'Customize object properties and their behavior'
date: 2020-01-25
categories: ['javascript']
ogImage: ./og-image.png
---

**Property descriptors** are a way to create (or modify) _customized_ properties on objects. Generally, we create and use properties as follows:

```js
// Specify a new property in object literal form
const myFavoriteBooks = {
	fiction: 'Harry Potter',
};

// Access the property
console.log(myFavoriteBooks.fiction); // 'Harry Potter'

// Enumerate over object keys
console.log(Object.keys(myFavoriteBooks)); // ['fiction']

// Modify or write a new value
myFavoriteBooks.fiction = 'Sherlock Holmes';
console.log(myFavoriteBooks.fiction); // 'Sherlock Holmes'

// Delete or configure the property
delete myFavoriteBooks.fiction;
console.log(myFavoriteBooks.fiction); // undefined
```

In JavaScript, [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) are also objects. They have a `length` property which returns the current length of the array.

While writing code, you might have noticed or run into some special cases where object properties behave differently. For example, consider an array of strings:

```js
// Note: This code runs in non strict mode

const favoriteBooks = ['The Lord of the Rings'];

// Just getting the current length
console.log(favoriteBooks.length); // 1

favoriteBooks.push('Norwegian Wood');

// This updated automatically?
console.log(favoriteBooks.length); // 2

// Why can't I find length in the list of keys?
console.log(Object.keys(favoriteBooks)); // ['0', '1']

// Let me add another property to my array (object)
favoriteBooks.type = 'fiction';

// But the type property appears in the list
console.log(Object.keys(favoriteBooks)); // ['0', '1', 'type']

// Let me try deleting the length and type properties
delete favoriteBooks.length;
delete favoriteBooks.type;

// Cool, type property was removed
console.log(Object.keys(favoriteBooks)); // ['0', '1']

// Wait, why is the length property still there?
console.log(favoriteBooks.length); // 2
```

A few questions to think about after going through the above snippet:

1. **How** does this `length` property **always gives us the updated value** of the length? It **isn't a function invocation** like `favoriteBooks.length()`, but a **regular property access** `favoriteBooks.length`.
2. We didn't explicitly change its value (unlike the first example with `myFavoriteBooks.fiction`), yet it somehow was able to return the correct value.
3. The `length` property didn't appear in the list of keys but the added `type` property did.
4. Why did the `delete` operation fail?

The answers to all these questions would be easier to understand with **property descriptors, getters and setters**.

## Property descriptors

Let's take a step back to the first example.

```js
const myFavoriteBooks = {
	fiction: 'Harry Potter',
};

console.log(Object.getOwnPropertyDescriptor(myFavoriteBooks, 'fiction'));
// {
//   value: 'Harry Potter',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

[`Object.getOwnPropertyDescriptor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) returns property descriptor for the specified key (in this case `fiction`).

**Property descriptor** are _meta properties_ for object properties. They contain information on how the property behaves in certain scenarios and what all operations are permissible.

It's also possible to create a new property with property descriptor using [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
const myFavoriteBooks = {};

Object.defineProperty(myFavoriteBooks, 'fiction', {
	// Meta properties a.k.a property descriptor
	value: 'Harry Potter',
	// By default these are true
	writable: true,
	enumerable: true,
	configurable: true,
});

console.log(myFavoriteBooks.fiction); // 'Harry Potter'
```

The _meta properties_ can be broadly classified into two types:

1. **Data descriptors**: `value`, `writable`, `enumerable`, `configurable`
2. **Accessor descriptors**: `get`, `set`, `enumerable`, `configurable` (often clubbed together as getter / setter pattern)

### Data descriptor

Property descriptor behave a bit differently in non strict and strict mode. Some operations fail silently in non strict mode but throw a `TypeError` in strict mode.

- **value**: defines the actual value held by the key.
- **writable**: when set to `true`, it allows changing the value of property. This fails silently in non strict mode but throw a `TypeError` in strict mode.
- **enumerable**: when set to `true`, it shows the property when enumerating over the object. For example in `for`…`in` and `Object.keys`.
- **configurable**: when set to `true`, it allows changing the property descriptor definitions. For a non configurable property, this will throw a `TypeError`. It has a couple of special cases:
  - `writable` can be changed from `true` to `false` (but not reverse) even if `configurable` is set to `false`
  - `configurable` also controls if `delete` operation is permitted. If set to `false`, the `delete` operation will fail silently in non strict mode but throw an error in strict mode

With this information, we can try to answer a few questions about `.length` property on an array:

1. The `length` property didn't appear in the list of keys but the added `type` property did.

   - The `length` property must not be `enumerable`.
   - By default any property added directly on the object is `enumerable`, thus `type` appears when enumerating over keys.

2. Why did the `delete` operation fail for `.length`?

   - The `length` property must be non `configurable`.

To answer the remaining questions lets look at property **getters and setters**.

### Accessor descriptor

**Accessor descriptor** also have `enumerable` and `configurable` _attributes_ that work same as data descriptor. The remaining two are:

- **get**: getter function for the specified property. Defaults to `undefined`.
- **set**: setter function for the specified property. Defaults to `undefined`.

These lets us override the default internal operations that the JavaScript engine performs while setting or accessing properties.

```js
let fiction = 'The Lord of the Rings';

const myBooksCollection = {
	favorite: 'Harry Potter',
	get fiction() {
		// getter
		return fiction;
	},
	set fiction(book) {
		// setter
		fiction = book;
	},
};

// This accesses the property directly
console.log(myBooksCollection.favorite); // 'Harry Potter'

// This calls the getter function
console.log(myBooksCollection.fiction); // 'The Lord of the Rings'

// This calls the setter function
myBooksCollection.fiction = 'The Hobbit';

console.log(myBooksCollection.fiction); // 'The Hobbit'

// Also we can enumerate over the keys
console.log(Object.keys(myBooksCollection)); // ['favorite', 'fiction']
```

Whenever, a getter or setter function is called, **its `this` is bound to the object containing it**. With this information, we can cover some pretty interesting usecases.

### Building an arbitrary length property

The internal workings of [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) property are pretty intricate (and hard to cover in this blog post) but we can try to build our own `length` property to uncover some of the questions from earlier:

1. How does the `length` property always gives us the updated value of the array's length?

   - It must be working like a getter function. Possibly, even without a function invocation like `length()`, using it as a property `length` could be invoking an _internal get_ function that returns the length.

2. We didn't explicitly change the value of `length` yet it somehow was able to return its correct (updated) value.

   - The internal workings depends on the JavaScript engine. However, lets try to implement something similar in a contrived example.

For this example, I'm using [`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) which works similar to `Object.defineProperty` but lets us define multiple properties at the same time.

```js
// Need to add new books and maintain a list
//
// myBooksList.value → should return list of books
// myBooksList.value = 'ABC' → should add the book 'ABC' to the list
// myBooksList.length → should return the number of books in the list

const myBooksList = {};

Object.defineProperties(myBooksList, {
	// underscore is used just as a convention
	_value: {
		value: [],
		writable: false,
		enumerable: false,
		configurable: false,
	},
	value: {
		// Note: a regular function instead of arrow function
		// so this can be bound for getter / setter functions
		get: function() {
			return this._value;
		},
		set: function(book) {
			this._value.push(book);
		},
		enumerable: true,
	},
});

console.log(Object.keys(myBooksList)); // ['value']

myBooksList.value = 'Sapiens';
myBooksList.value = 'Born to Run';
console.log(myBooksList.value); // ['Sapiens', 'Born to Run']
```

Expanding upon the example to add a `length` property:

```js
const myBooksList = {};

Object.defineProperties(myBooksList, {
	// highlight-start
	length: {
		value: 0,
		enumerable: false,
		configurable: false,
	},
	// highlight-end
	_value: {
		value: [],
		writable: false,
		enumerable: false,
		configurable: false,
	},
	value: {
		get: function() {
			return this._value;
		},
		set: function(book) {
			this._value.push(book);
			this.length += 1; // highlight-line
		},
		enumerable: true,
	},
});

console.log(myBooksList.length); // 0
myBooksList.value = 'Animal Farm';
console.log(myBooksList.length); // 1
```

Voila! We just created our own `length` property ✌️

## Further reading

- [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [`Object.getOwnPropertyDescriptor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- [`length` specs](https://tc39.es/ecma262/#sec-properties-of-array-instances-length)
