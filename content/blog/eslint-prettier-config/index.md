---
title: 'Custom eslint and prettier config'
description: 'Managing the linting and formatting needs of your entire JS infra with a single package'
date: 2020-04-01
categories: ['javascript', 'software-engineering']
ogImage: ./og-image.png
---

[Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) have pretty much become an integral part of modern JavaScript applications. One problem I often ran into was setting both of them up for new libraries and projects (plus maintaining the old ones), which used to take quite a bit of time. Another problem was keeping all rules in sync amongst all my projects so I could focus more on writing code instead of tweaking and keeping all the linting rules in sync.

This problem can also arise in your organization as the number of projects starts to grow. Here the need for keeping things consistent and in sync is more important since different developers may be working across projects.

> I also recorded a [short video](https://www.youtube.com/watch?v=-ah-kEf-owM) for this blog on my YouTube channel!

## Config package

Both [Eslint](https://eslint.org/docs/user-guide/configuring#extending-configuration-files) and [Prettier](https://prettier.io/docs/en/configuration.html#sharing-configurations) are configurable through a configuration object (which can be made available through a common node package via NPM).

There are tons of config packages in the wild. The best part is, you can combine the ones you need into a single package that works for you. I've created a package [`eslint-config-fast-lint-prettify`](https://github.com/wtjs/eslint-config-fast-lint-prettify) based on the same idea which combine all my linting and prettifying needs:

- `eslint`
- `babel-eslint`
- `eslint-config-airbnb`
- `eslint-config-prettier`
- `eslint-plugin-import`
- `eslint-plugin-jest`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-prettier`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `prettier`

## How does it work

> **tl;dr** - feel free to [fork](https://github.com/wtjs/eslint-config-fast-lint-prettify) (or directly use) the package and tweak it to your needs.

In order to create your own custom `eslint` config, all you need to do is:

1. Export an `eslint` configuration object from your custom eslint package (you can also publish this to NPM).
2. Go to a project you wish to use the above package.
3. Install and add the package in your `.eslintrc` file. Add overrides if needed.

> Check out the [usage](https://github.com/wtjs/eslint-config-fast-lint-prettify#usage) section at GitHub for more info.

For example, create an `index.js` file in your custom eslint config package which could look something like:

```js
// index.js

// your custom eslint rules go here
// these are the ones I use
const eslint = {
	extends: [
		'airbnb',
		'plugin:jest/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	plugins: ['jest', 'prettier'],
	parser: 'babel-eslint',
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': 0,
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-unused-vars': [
			'error',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
		],
	},
	env: {
		'jest/globals': true,
	},
};

module.exports = eslint;
```

And in your project where you want to use this, add the package in `.eslintrc`, you can also add project specific overrides:

```json
{
	"extends": ["fast-lint-prettify"]
}
```

Similarly for `prettier`, export a `prettier` configuration object from your custom package. For example:

```js
// prettier.js

// add your own configuration here
const prettier = {
	useTabs: true, // I don't mind spaces as well :)
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	tabWidth: 2,
};

module.exports = prettierConfig;
```

And finally in your project where you want to use this, refer the package in `package.json`:

```json
{
	"prettier": "eslint-config-fast-lint-prettify/prettier"
}
```

This can also be done through a `.prettierrc.js` file if you wish to add any overrides:

```js
// .prettierrc.js

const prettier = require('eslint-config-fast-lint-prettify/prettier');

// You can also overwrite some keys in this config

module.exports = prettier;
```

## Some tips

Since I needed a single package installation, I've added the following as direct dependencies in my custom eslint and prettier config package:

- `eslint`
- `babel-eslint`
- `eslint-config-airbnb`
- `eslint-config-prettier`
- `eslint-plugin-import`
- `eslint-plugin-jest`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-prettier`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `prettier`

So, whenever I need to use the package I just need a single command for the installation:

```sh
yarn add -DE eslint-config-fast-lint-prettify
```

Then in my `scripts` I can directly refer to both `eslint` and `prettier`, for example I can add a `lint` script in my `package.json`:

```json
{
	"scripts": {
		"lint": "yarn eslint ."
	}
}
```

Alternatively, you can make all of the above as peer dependencies with the following tradeoffs:

- You'll have to manually install all the `peerDependencies` across different projects
- Different projects can have different versions of `peerDependencies`

I personally prefer the former approach.

## Summary

Having a unified package bundled with all your linting needs can go a long way towards improving DX 😄
