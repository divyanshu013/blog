---
title: "Don't solve problems you don't have"
description: ''
date: 2022-05-24
categories: ['software-engineering', 'essay']
ogImage: ./og-image.png
---

This is going to be a long pending essay _(having procrastinating for a while)_ on one of the biggest realizations I've had building softwares:

> Don't solve problems you don't have!
>
> -- [metagrover](https://twitter.com/metagrover) _on a late night, pair coding session at around 2 AM, sometime in late 2017 / early 2018_ 😸

michael scott https://i.imgur.com/EePKQ.png

As software engineers we like working on solving problems.

[https://twitter.com/promit_roy/status/1405912880663433223?s=20](https://twitter.com/promit_roy/status/1405912880663433223?s=20)

a new framework won't solve your problems

a custom built solution won't

majority of complexity in your application lives in your code, not in the framework

- your team also affects which frameworks and libraries you work with

you might think this solution is complex let's build my own, complexity would still be there because problem is itself complex, you will just have different tradeoffs to tackle that complexity (different apis, different constraints)

maintaining your solution adds to the complexity, needs dedicated bandwidth

KISS

don't try to solve all future problems because you don't know about them, solve for today, rewrites are inevitable

optimize for that change (dan's post)

solve important problems and iterate (progressive enhancement) - for example after login - refresh full page, then progressively enhance it to update user state without needing full page reload (solve important problems first - basically these can be solved later as well without affecting architecture much.)

pieter levels - remote ok single php file

typescript?

serverless for scale? number of users / requests

progressive enhancements

codepush

[https://xkcd.com/927/](https://xkcd.com/927/)

[https://news.ycombinator.com/item?id=31907374](https://news.ycombinator.com/item?id=31907374)

# Don't solve problems you don't have

[https://www.wikiwand.com/en/Rule_of_least_power](https://www.wikiwand.com/en/Rule_of_least_power)

SSR / SSG

[Gall's Law [Principles Wiki]](http://principles-wiki.net/principles:gall_s_law)perf

[Rule of least power - Wikiwand](https://www.wikiwand.com/en/Rule_of_least_power)

- not only initial load but also after the app loads - example critical css with css in js but heavy in processing
  - [https://pustelto.com/blog/css-vs-css-in-js-perf/](https://pustelto.com/blog/css-vs-css-in-js-perf/)
- a new tech doesn't make the problem less complicated, it's just a different way to handle the business problem with different tradeoffs

Does technology matter?

- It depends lol
- you don't need that shiny tech
- but that doesn't mean you should only use what you know today, DX matters. Example given two cars which one would you travel by? If all you need is to go from point A to point B. The journey is also important

New tech will have more unknowns you'll discover which people haven't (rip stackoverflow - won't able to find problems people have already run into)

New tech means hiring / team issues (limited innovation coins - link to post [https://boringtechnology.club/](https://boringtechnology.club/))

---

[https://twitter.com/promit_roy/status/1405912880663433223?s=20](https://twitter.com/promit_roy/status/1405912880663433223?s=20)

a new framework won't solve your problems

a custom built solution won't

majority of complexity in your application lives in your code, not in the framework

- your team also affects which frameworks and libraries you work with

you might think this solution is complex let's build my own, complexity would still be there because problem is itself complex, you will just have different tradeoffs to tackle that complexity (different apis, different constraints)

maintaining your solution adds to the complexity, needs dedicated bandwidth

KISS

don't try to solve all future problems because you don't know about them, solve for today, rewrites are inevitable

optimize for that change (dan's post)

solve important problems and iterate (progressive enhancement) - for example after login - refresh full page, then progressively enhance it to update user state without needing full page reload (solve important problems first - basically these can be solved later as well without affecting architecture much.)

pieter levels - remote ok single php file

typescript?

serverless for scale? number of users / requests

progressive enhancements

codepush

[https://zerodha.tech/blog/being-future-ready-with-common-sense/](https://zerodha.tech/blog/being-future-ready-with-common-sense/)

gatsby, complexity

service worker, incremental builds

graphql - [https://portal.gitnation.org/contents/it-depends-examining-graphql-myths-and-assumptions](https://portal.gitnation.org/contents/it-depends-examining-graphql-myths-and-assumptions)

design systems

[https://future.a16z.com/software-development-building-for-99-developers/](https://future.a16z.com/software-development-building-for-99-developers/)

how developers think - [goodreads.com](http://goodreads.com) example - tech is just a tool

[https://boringtechnology.club](https://boringtechnology.club/)

Good reads, ikea
google performance, analytics / tag manager
