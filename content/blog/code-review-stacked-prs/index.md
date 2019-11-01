---
title: 'Stacked PRs'
description: 'Effective code review on merging large changes with stacked pull requests'
date: 2019-10-31
categories: ['software-engineering']
ogImage: ./og-image.png
---

As software engineers, we often collaborate on code using [pull requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) (PRs). Its a good practice to enforce code review for pull requests. This can help in getting feedback from your team, catching potential bugs or edge cases, and improving code quality. Generally when working on features, we create a single PR with all the changes, get it reviewed and then merge to master (main branch).

This works for small to medium sized PRs _(up to your discretion)_. However, for larger PRs it becomes quite tough to review everything for the reviewer(s). Usually, we should **split the work** into multiple chunks for an easier code review. In this post I'll cover how to approach this with **stacked PRs**. tl;dr please skip to the last section.

> At times a single giant PR may be unavoidable (automated changes, trivial fixes across multiple files, formatting changes, linting fixes, a bug fix not feasible to split into multiple parts or tough deadlines).

## Example case

Consider a hypothetical feature you're working on, say you've to **add a dashboard screen which displays user's profile information**. Here's a generic approach you might follow with a single PR:

1. Create a new feature branch off `master`
1. Check into the feature branch, finish the feature and commit your changes
1. Create a new PR from your feature branch to `master`
1. Get the PR reviewed and merge to `master`
1. Party!

This is how the above workflow looks like:

```
master <-- feat/add-user-profile-info-screen
```

How can we improve this if the PR is big and make it easier for code review?

## Multiple PRs

If the feature can be split and merged into `master` in chunks, we can create **multiple PRs**. _Refer diagram below for visual context._.

1. Create a new feature branch off `master`, say `feat/add-components-user-profile`
1. Perhaps work on a few presentational only components initially, commit the changes
1. Create a new PR from the above branch to `master`
1. Get it reviewed and merge to `master`
1. Things look good, maybe next work on the screen component to integrate the above components (`feat/integrate-user-profile-components`)
1. Repeat same process to get it merged to `master`
1. Now it might be a good idea to update a few API calls for the updated screen (`feat/update-user-profile-apis`)
1. Repeat same process and get it merged to `master`
1. Party!

This is how the above workflow might look like:

```
master <-- feat/add-components-user-profile
↓
master <-- feat/integrate-user-profile-components
↓
master <-- feat/update-user-profile-apis
```

This is a good start but this approach may not work always.

- There might be a dependency between your multiple PRs, which can block you from proceeding till your previous PR is merged. For example, in order to work on integrating user profile components (`feat/integrate-user-profile-components`), you would first need the PR which adds them (`feat/add-components-user-profile`).
- Say the `master` branch is auto deployed. You might want to avoid deploying a _half-finished_ feature since it adds extra surface for QA and bugs.
- You might want to add some test coverage or end to end tests before deploying.
- The reviewer might be in a different time zone, so you may want to work on the second PR before the reviewer gets a chance to review the first PR.

## Stacking PRs

Lets improve the above workflow by **stacking PRs**. _Refer diagram below for visual context._

1. Create a new branch off `master`, say `feat/user-profile-screen`. This will be our main **integration branch**. We'll create subsequent PRs to this branch (instead of `master`). When everything's done, we'll create a final PR from this branch to `master`.
1. Create a new branch from `feat/user-profile-screen`, say `feat/user-profile-screen/components`.
1. Work on the presentational only components on `feat/user-profile-screen/components` branch. When done, push the changes and create a PR to merge changes to `feat/user-profile-screen`.
1. Next, create a new branch off `feat/user-profile-screen/components`, say `feat/user-profile-screen/integrate-components`.
1. Work on integrating the components to the screen and create another PR to merge changes to `feat/user-profile-screen/components`
1. Similarly, create a new branch `feat/user-profile-screen/update-api` from this branch and create a PR to merge API changes back to `feat/user-profile-screen/integrate-components`.

This is how the workflow may look like visually:

```
master <-- feat/user-profile-screen (integration branch)
						↑ (PR 1)
					 feat/user-profile-screen/components
						↑ (PR 2)
					 feat/user-profile-screen/integrate-components
						↑ (PR 3)
					 feat/user-profile-screen/update-api
```

This looks like a stack of PRs (hence the name). All subsequent PRs are stacked on top of each other. Once reviewed, we would **merge the topmost PR first** (PR 3), followed by PR 2 and finally PR 1. If there are any review comments in any PR, we'll address them in the same PR.

The reviewer can start the review process from any PR, though it would make more sense to review the PRs in the same order they were created, i.e. PR 1, PR 2 and then PR 3. Since PRs are split into smaller parts based on functionality, they would be easier to review.

Once a PR is approved, we would merge it if there are no other PRs on top of it. For example, don't merge PR 2 before PR 3 is merged. Once all stacked PRs are merged, create a final integration PR from `feat/user-profile-screen` to `master`. This can be a large PR but since the code is already reviewed in the stacked PRs it can be skimmed through and approved easily.

> **Note**
>
> If PR 1 is approved before you start on PR 2, you can merge PR 1 and then create a new branch off the integration branch (`feat/user-profile-screen`) itself instead of creating a stacked PR 2

## Conclusion

Splitting work into multiple PRs can improve the code review process. Creating stacked PRs is a great way to achieve this. With stacked PRs you can even continue to work on subsequent PRs while you're waiting on review for older PRs. Here's a summary of this post:

```
master <-- feat/some-feature (integration branch)
						↑ (PR 1)
					 feat/some-feature/sub-feature-1
						↑ (PR 2)
					 feat/some-feature/sub-feature-2
						↑ (PR 3)
					 feat/some-feature/sub-feature-3
```
