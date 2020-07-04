---
title: 'React debounce and throttle with hooks'
description: 'How to use debounce and throttle and abstract them into hooks'
date: 2020-07-03
categories: ['react']
ogImage: ./og-image.png
---

[Hooks](https://reactjs.org/docs/hooks-intro.html) are a brilliant addition to React. They simplify a lot of logic that had to be earlier split up into different lifecycles with `class` components. They do, however, require a _different_ mental model, [especially for timers](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

> I also recorded a short [video series](https://www.youtube.com/playlist?list=PLMV09mSPNaQlN92-1Dkz5NDlNgGQJEo75) on this article which you may find more explanatory.

## Debounce and throttle

There are a ton of blog posts around debounce and throttle so I won't be diving into how to write our own debounce and throttle. For brevity, consider [`debounce`](https://lodash.com/docs/4.17.15#debounce) and [`throttle`](https://lodash.com/docs/4.17.15#throttle) from Lodash.

If you need a quick refresher, both accept a (callback) function and a _delay_ in milliseconds (say `x`) and return another function with some special behavior:

- `debounce`: returns a function that can be called any number of times (possibly in quick successions) but would only invoke the callback **after waiting** for `x` ms from the last call.
- `throttle`: returns a function that can be called any number of times (possibly in quick successions) but would only invoke the callback atmost **once** every `x` ms.

## Usecase

We've a minimal blog editor ([GitHub repo](https://github.com/wtjs/react-debounce-throttle-hooks/)) and we would like to save the blog post to the database 1 second after user stops typing. A minimal version looks like:

```js
import React, { useState } from 'react';
import debounce from 'lodash.debounce';

function App() {
	const [value, setValue] = useState('');
	const [dbValue, saveToDb] = useState(''); // would be an API call normally

	const handleChange = event => {
		setValue(event.target.value);
	};

	return (
		<main>
			<h1>Blog</h1>
			<textarea value={value} onChange={handleChange} rows={5} cols={50} />
			<section className="panels">
				<div>
					<h2>Editor (Client)</h2>
					{value}
				</div>
				<div>
					<h2>Saved (DB)</h2>
					{dbValue}
				</div>
			</section>
		</main>
	);
}
```

Here, `saveToDb` would actually be an API call to the backend. For keeping things simple, I'm saving it in state and then rendering as `dbValue`. Since we only want to perform this save operation once user has stopped typing (after 1 second), this should be _debounced_.

[Here's](https://github.com/wtjs/react-debounce-throttle-hooks/tree/starter) the starter code repo and branch.

## Creating a debounced function

First of all, we need a debounced function that wraps the call to `saveToDb`:

```js
import React, { useState } from 'react';
import debounce from 'lodash.debounce';

function App() {
	const [value, setValue] = useState('');
	const [dbValue, saveToDb] = useState(''); // would be an API call normally

	const handleChange = event => {
		const { value: nextValue } = event.target;
		setValue(nextValue);
		// highlight-starts
		const debouncedSave = debounce(() => saveToDb(nextValue), 1000);
		debouncedSave();
		// highlight-ends
	};

	return <main>{/* Same as before */}</main>;
}
```

But, this doesn't actually work because the function `debouncedSave` is created fresh on each `handleChange` call. This would end up debouncing each keystroke rather than debouncing the entire input value.

## useCallback

Although [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) is commonly used for performance optimizations when passing callbacks to child components, we can use its constraint of memoizing a callback function to ensure the `debouncedSave` references the same debounced function across renders.

This works as expected:

```js
import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

function App() {
	const [value, setValue] = useState('');
	const [dbValue, saveToDb] = useState(''); // would be an API call normally

	// highlight-starts
	const debouncedSave = useCallback(
		debounce(nextValue => saveToDb(nextValue), 1000),
		[], // will be created only once initially
	);
	// highlight-ends

	const handleChange = event => {
		const { value: nextValue } = event.target;
		setValue(nextValue);
		// Even though handleChange is created on each render and executed
		// it references the same debouncedSave that was created initially
		debouncedSave(nextValue);
	};

	return <main>{/* Same as before */}</main>;
}
```

## useRef

[`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) gives us a mutable object whose `current` property refers to the passed initial value. If we don't change it manually, the value would persist for the entire lifetime of the component. This is similar to class instance properties (i.e. defining methods and properties on `this`).

This also works as expected:

```js
import React, { useState, useRef } from 'react';
import debounce from 'lodash.debounce';

function App() {
	const [value, setValue] = useState('');
	const [dbValue, saveToDb] = useState(''); // would be an API call normally

	// This remains same across renders
	// highlight-starts
	const debouncedSave = useRef(debounce(nextValue => saveToDb(nextValue), 1000))
		.current;
	// highlight-ends

	const handleChange = event => {
		const { value: nextValue } = event.target;
		setValue(nextValue);
		// Even though handleChange is created on each render and executed
		// it references the same debouncedSave that was created initially
		debouncedSave(nextValue);
	};

	return <main>{/* Same as before */}</main>;
}
```

## Extracting a custom hook

Both of the above examples using `useCallback` and `useRef` work fine for our usecase. This is good for one off cases but wouldn't it be nice if there was a simpler API? The code will be much more readable if we don't have to assemble the debounce logic with `useCallback` and `useRef`. We can certainly do so by abstracting this logic into a custom `useDebounce` hook!

Here's one way to do it with `useCallback`:

```js
import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

// highlight-starts
function useDebounce(callback, delay) {
	const debouncedFn = useCallback(
		debounce((...args) => callback(...args), delay),
		[delay], // will recreate if delay changes
	);
	return debouncedFn;
}
// highlight-ends

function App() {
	const [value, setValue] = useState('');
	const [dbValue, saveToDb] = useState(''); // would be an API call normally

	// highlight-starts
	const debouncedSave = useDebounce(nextValue => saveToDb(nextValue), 1000);
	// highlight-ends

	const handleChange = event => {
		const { value: nextValue } = event.target;
		setValue(nextValue);
		debouncedSave(nextValue);
	};

	return <main>{/* Same as before */}</main>;
}
```

This code also works as expected but weirdly my TypeScript linter throws an error:

```
React Hook useCallback received a function whose dependencies are unknown.
Pass an inline function instead. eslint(react-hooks/exhaustive-deps)
```

The same works fine without any linting errors in JavaScript (using a `create-react-app` template). Anyway, here's an alternative for the same `useDebounce` hook written using `useRef`:

```js
function useDebounce(callback, delay) {
	// Memoizing the callback because if it's an arrow function
	// it would be different on each render
	const memoizedCallback = useCallback(callback, []);
	const debouncedFn = useRef(debounce(memoizedCallback, delay));

	useEffect(() => {
		debouncedFn.current = debounce(memoizedCallback, delay);
	}, [memoizedCallback, debouncedFn, delay]);

	return debouncedFn.current;
}
```

This isn't as clean as the previous example with `useCallback`, but perhaps the lint warning I'm getting is a bug and will probably be fixed in the TypeScript linter soon.

In this post I covered only `debounce` but `throttle` can be used in a similar fashion. Similarly, you may abstract out the logic into a `useThrottle` hook.

## Further reading

- [Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
- [Video series](https://www.youtube.com/playlist?list=PLMV09mSPNaQlN92-1Dkz5NDlNgGQJEo75)
- [GitHub repo](https://github.com/wtjs/react-debounce-throttle-hooks)

If you've suggestions for a better way for writing these hooks, I would be happy to receive feedback and update this post.

_Thanks to my friends [Deepak](https://twitter.com/metagrover) and [Dhruv](https://twitter.com/dhruvdutt/)_
