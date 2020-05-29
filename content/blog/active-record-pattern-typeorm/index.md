---
title: 'Active record pattern in Typeorm'
description: 'Comparing active record pattern with the data mapper pattern and when to use which'
date: 2020-05-29
categories: ['typescript', 'typeorm', 'typegraphql', 'graphql']
ogImage: ./og-image.png
---

Typeorm primarily supports two ways of manipulating data:

- Active record pattern
- Data mapper pattern

Both of these patterns were popularized by [Martin Fowler](https://www.martinfowler.com) and a lot of frameworks such as [Typeorm](https://typeorm.io/) and [Django](https://docs.djangoproject.com/en/3.0/misc/design-philosophies/) take inspiration from them.

I've been using Typeorm lately and really liking how well the **active record pattern** plays. The **data mapper pattern** is nice but I think the active record pattern hits the sweet spot unless your project has grown quite a bit in size.

## Data mapper pattern

[Data mapper](https://martinfowler.com/eaaCatalog/dataMapper.html) is an additional layer of service (business logic) between the data model (object) and the database.

```
Model (or entity) ↔ Data mapper ↔ Database
```

I'm using [Type Graphql](https://typegraphql.com/) for declaring entities (models) and resolvers. Consider a `User` entity (model in conventional ORMs) as an example for this post. You don't need to worry about the `type-graphql` details for this post since both patterns are agnostic of it.

```ts
// Entity

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column('text', { unique: true })
	email: string;

	@Column('text')
	password: string;
}
```

Here's how the resolver for this may look like:

```ts
// Resolver

import { getConnection, getRepository } from 'typeorm';
import { Resolver, Query } from 'type-graphql';

import { User } from './entity/User';

@Resolver()
class UserResolver {
	@Query(() => [User])
	users() {
		// get all users
		// highlight-starts
		return getConnection()
			.getRepository(User)
			.find();
		// highlight-ends
	}
}
```

The logic for fetching data lives in the repository (data mapper) in this case `getRepository(User)`. This is the general approach recommended in [Typeorm's getting started](https://typeorm.io/#/) guide. Here's how we can simplify this with the active record pattern.

## Active record pattern

[Active record](https://www.martinfowler.com/eaaCatalog/activeRecord.html) in short encapsulates the data manipulation logic on the entity (model) itself (often called domain object).

```
Model (or entity) ↔ Database
```

With Typeorm we can turn an entity into an active record by extending the `BaseEntity` class:

```ts
// entity

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column('text', { unique: true })
	email: string;

	@Column('text')
	password: string;
}
```

`BaseEntity` provides a number of preset data manipulation methods. So the resolver from earlier can now be written as:

```ts
import { getConnection, getRepository } from 'typeorm';
import { Resolver, Query } from 'type-graphql';

import { User } from './entity/User';

@Resolver()
class UserResolver {
	@Query(() => [User])
	users() {
		// get all users
		// highlight-starts
		return User.find();
		// highlight-ends
	}
}
```

## Comparison

A few reasons why I'm enjoying active record pattern more:

- Precise syntax, cleaner code
- Logic for data manipulation lives with the entity itself
- Don't have to deal with repositories

When working with multiple entities it becomes a bit repetitive to get the respective repositories and then perform data operations, which isn't the case when the entities themselves can hold the methods for operating on data. I think active records work well until your project has grown to a significant size (and you might want to separate out logic from entities).

It's an added benefit the data manipulation logic lives along with the entity (in the same file). So when I'm making changes I know all the related logic would be coupled together.

Active records are also extensible. It's possible to add your own methods as `static` properties:

```ts
@Entity('users')
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column('text', { unique: true })
	email: string;

	@Column('text')
	password: string;

	// highlight-starts
	static isEmailConfirmed(validation) {
		// check
	}
	// highlight-ends
}

// Now this can be used
if (User.isEmailConfirmed(validationFn)) {
	// Do something
}
```

Final thoughts, both these approaches have their own tradeoffs. You may notice one of your entities growing out of hand which might be a good time to move business logic to a repository and make the entity "dumb". This separation kind of reminds me of how we used to split components in react into presentational (dumb) and container components (connected to redux and business logic) a few years back when redux started gaining popularity.

I think dependency injections with custom repositories might be something worth exploring in the future when I feel the need to have repositories for my entities.

### Tl;dr

If you're using Typeorm, active record can be good enough for most cases. When you see an entity has become quite complex or overgrown, move the business logic to a repository or even create different repositories for different contexts.

## APIs for active record pattern

The Typeorm official docs are a bit lacking in talking about `BaseEntity` and the active record pattern but most of the API is similar to the [repository API](https://typeorm.io/#/repository-api). If you're using TypeScript, you can rely on your editor's autocompletion a bit.

> **Note**
>
> Not all repository methods are supported, for example `increment`. For these you may create your own methods on the entity or use the repository API.

## Further reading

Check out the [Typeorm docs](https://typeorm.io/#/active-record-data-mapper).
