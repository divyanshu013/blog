---
title: 'Build Simpler Components'
description: 'Patterns for building components with good code readability and simplicity'
date: 2021-12-05
categories: ['react']
ogImage: ./og-image.png
---

There are ton of articles on the web about advanced React component patterns for example - compound components, render props, higher order components and many more. While it's nice to know about these advanced patterns, a majority of components we build often don't need to handle such complexities.

In this post I'll condense my thoughts about _patterns_ I haven't seen people cover (much), which can help us build **simpler components**.

## Simplify rendering logic

Split a larger component into multiple components or JSX blocks. A good rule of thumb, if your indentation is growing deeper, it might be a good time to extract things into smaller components or JSX blocks (referenced by variables). The return block shouldn't look like a giant blob of JSX.

Here's a contrived signup screen component (a very simplified version of an existing component from a side project _which I should ship soon)_, implementation details aren't important for this post, I'll be focusing on the rendering logic only.

```jsx
function SignupScreen() {
	const onSubmit = () => {
		// ...
	};

	return (
		<main>
			<Flex alignItems="center" mb={2}>
				<Image src="/static/app-logo.svg" alt="" width="24px" height="24px" />
				<H1 pl={2}>Create a new account</H1>
			</Flex>
			<form onSubmit={onSubmit}>
				<FormControl id="email">
					<FormLabel>Email address</FormLabel>
					<Input type="email" />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Password</FormLabel>
					<Input type="password" />
				</FormControl>
				<Button type="submit">Submit</Button>
			</form>
			<Flex alignItems="center" my={2} gap={1}>
				<Link to="/contact">Contact</Link>
				<Link to="/about">About</Link>
			</Flex>
			<Image
				src="/static/app-footer-logo.svg"
				alt=""
				width="24px"
				height="24px"
			/>
		</main>
	);
}
```

Now, this doesn't look bad in terms of readability but this example is most likely simpler (or smaller) than most components we build. The first method is to break down the JSX soup into smaller, easier to digest bits.

### Split JSX blocks into variables

```jsx
function SignupScreen() {
	const onSubmit = () => {
		// ...
	};

	// refactor JSX blocks into variables
	// highlight-start
	const formHeader = (
		<Flex alignItems="center" mb={2}>
			<Image src="/static/app-logo.svg" alt="" width="24px" height="24px" />
			<H1 pl={2}>Create a new account</H1>
		</Flex>
	);
	// highlight-end

	// highlight-start
	const signupForm = (
		<form onSubmit={onSubmit}>
			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input type="email" />
			</FormControl>
			<FormControl id="password">
				<FormLabel>Password</FormLabel>
				<Input type="password" />
			</FormControl>
			<Button type="submit">Submit</Button>
		</form>
	);
	// highlight-end

	// highlight-start
	const formFooter = (
		<>
			<Flex alignItems="center" my={2} gap={1}>
				<Link to="/contact">Contact</Link>
				<Link to="/about">About</Link>
			</Flex>
			<Image
				src="/static/app-footer-logo.svg"
				alt=""
				width="24px"
				height="24px"
			/>
		</>
	);
	// highlight-end

	return (
		// a more readable rendering logic now
		// highlight-start
		<main>
			{formHeader}
			{signupForm}
			{formFooter}
		</main>
		// highlight-end
	);
}
```

Much easier to read, also each JSX block is named, concise and it's easier to understand the intent. This can be rinsed and repeated if the individual blocks themselves are larger.

### Split larger components into smaller ones

When there is more logic involved (hooks, handlers, state) it might not be feasible to split JSX blocks into variables. This is when we should split them into components. This is one of the base concepts taught in [React docs](https://reactjs.org/docs/components-and-props.html#extracting-components), yet in practice I often don't see people do this enough.

For example, splitting the signup form into a smaller component:

```jsx
// As this gets larger and more complex, move it into a separate file
// highlight-start
function SignupForm() {
	const onSubmit = () => {
		// ...
	};
	return (
		<form onSubmit={onSubmit}>
			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input type="email" />
			</FormControl>
			<FormControl id="password">
				<FormLabel>Password</FormLabel>
				<Input type="password" />
			</FormControl>
			<Button type="submit">Submit</Button>
		</form>
	);
}
// highlight-end

function SignupScreen() {
	const formHeader = (
		<Flex alignItems="center" mb={2}>
			<Image src="/static/app-logo.svg" alt="" width="24px" height="24px" />
			<H1 pl={2}>Create a new account</H1>
		</Flex>
	);

	const formFooter = (
		<>
			<Flex alignItems="center" my={2} gap={1}>
				<Link to="/contact">Contact</Link>
				<Link to="/about">About</Link>
			</Flex>
			<Image
				src="/static/app-footer-logo.svg"
				alt=""
				width="24px"
				height="24px"
			/>
		</>
	);

	return (
		<main>
			{formHeader}
			// highlight-start
			<SignupForm />
			// highlight-end
			{formFooter}
		</main>
	);
}
```

## Simplify conditional rendering

The idea is similar to above, make the rendering logic not look like a conditional JSX soup. In order to explain this point, here's how the `SignupForm` component from above could look like when we start displaying errors in the UI.

```jsx
function SignupForm() {
	// a react-query mutation hook which calls signup API
	const signupMutation = useMutation(() => {
		// ...
	});

	// performs signupMutation.mutate with the form data
	const onSubmit = () => {
		// ...
	};

	// the error response from backend is an object with each field name as error key
	const fieldErrors = signupMutation.error?.errorResponse.fieldErrors; // highlight-line

	return (
		<form onSubmit={onSubmit}>
			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input type="email" />
			</FormControl>
			// highlight-start
			{fieldErrors?.email && <Text color="red400">{fieldErrors.email}</Text>}
			// highlight-end
			<FormControl id="password">
				<FormLabel>Password</FormLabel>
				<Input type="password" />
			</FormControl>
			// highlight-start
			{fieldErrors?.password && (
				<Text color="red400">{fieldErrors.password}</Text>
			)}
			// highlight-end
			<Button type="submit" disabled={signupMutation.isLoading}>
				// highlight-start
				{signupMutation.isLoading ? 'Submitting...' : 'Submit'}
				// highlight-end
			</Button>
		</form>
	);
}
```

This doesn't look bad in terms of readability per se but main idea is to simplify the conditionals so the same things can be applied to larger components. Following the previous examples we can either split the conditionals into variables or into smaller components.

### Split conditionals into variables

```jsx
function SignupForm() {
	// a react-query mutation hook which calls signup API
	const signupMutation = useMutation(() => {
		// ...
	});

	// performs signupMutation.mutate with the form data
	const onSubmit = () => {
		// ...
	};

	// the error response from backend is an object with each field name as error key
	const fieldErrors = signupMutation.error?.errorResponse.fieldErrors;

	// variables make the intent easier to understand
	// highlight-start
	const emailError = fieldErrors?.email && (
		<Text color="red400">{fieldErrors.email}</Text>
	);
	const passwordError = fieldErrors?.password && (
		<Text color="red400">{fieldErrors.password}</Text>
	);

	const buttonText = signupMutation.isLoading ? 'Submitting...' : 'Submit';
	// highlight-end

	return (
		<form onSubmit={onSubmit}>
			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input type="email" />
			</FormControl>
			// highlight-start
			{emailError}
			// highlight-end
			<FormControl id="password">
				<FormLabel>Password</FormLabel>
				<Input type="password" />
			</FormControl>
			// highlight-start
			{passwordError}
			// highlight-end
			<Button type="submit" disabled={signupMutation.isLoading}>
				// highlight-start
				{buttonText}
				// highlight-end
			</Button>
		</form>
	);
}
```

### Split conditionals into smaller components

Another way to further simplify conditionals is delegating them into a smaller component. We can pass the data to this smaller component and it takes responsibility of conditional rendering. With this change the main JSX block becomes unconditional and simpler to read.

```jsx
// conditional rendering logic is contained within this smaller component
// highlight-start
function FieldError(error) {
	return error ? <Text color="red400">{error}</Text> : null;
}
// highlight-end

function SignupForm() {
	// a react-query mutation hook which calls signup API
	const signupMutation = useMutation(() => {
		// ...
	});

	// performs signupMutation.mutate with the form data
	const onSubmit = () => {
		// ...
	};

	// the error response from backend is an object with each field name as error key
	const fieldErrors = signupMutation.error?.errorResponse.fieldErrors;

	const buttonText = signupMutation.isLoading ? 'Submitting...' : 'Submit';

	return (
		// no conditionals in the main block
		<form onSubmit={onSubmit}>
			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input type="email" />
			</FormControl>
			// highlight-start
			<FieldError error={fieldErrors?.email} />
			// highlight-end
			<FormControl id="password">
				<FormLabel>Password</FormLabel>
				<Input type="password" />
			</FormControl>
			// highlight-start
			<FieldError error={fieldErrors?.password} />
			// highlight-end
			<Button type="submit" disabled={signupMutation.isLoading}>
				{buttonText}
			</Button>
		</form>
	);
}
```

Here the conditional logic is dependent only on the presence of a single `error` factor. If the condition itself involves multiple factors we can also break it down into variables and reduce the number of factors. For example:

```js
// check if password is strong enough
if (
	isPasswordMinLength &&
	passwordIncludesLowerCase &&
	passwordIncludesUpperCase &&
	(passwordIncludesNumbers || passwordIncludesSpecialCharacters)
) {
	return true;
}

// breakdown conditionals into variables
// more code but explains more intent
const passwordIncludesExtras =
	passwordIncludesNumbers || passwordIncludesSpecialCharacters;
const passwordIncludesLetters =
	passwordIncludesLowerCase && passwordIncludesUpperCase;
const isPasswordValid =
	isPasswordMinLength && passwordIncludesLetters && passwordIncludesExtras;

if (isPasswordValid) {
	return true;
}
```

I've found these small tips can greatly improve code readability and maintenance. I'll probably come back to add few more later :)

> One of my favorite principles for building and designing software is [KISS](https://www.wikiwand.com/en/KISS_principle) - _Keep It Sweet and Simple_. A simple solution generally scales the best.
