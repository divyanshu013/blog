---
title: 'Takeaways from creation of React'
description: 'Lessons beyond purely technical side of things from creation of one of the most popular frontend frameworks'
date: 2023-03-22
categories: ['software-engineering']
ogImage: ./og-image.png
---

While watching the wonderful [react.js documentary](https://www.youtube.com/watch?v=8pDqJVdNa44), even more than purely technical marvel, I was impressed much more by things beyond code that made React possible - people, teams, leadership.

## Product and infrastructure harmony

In larger orgs, generally there are separate product and infrastructure (or platform) teams. While product teams primarily focus on building product features, infrastructure teams primarily focus on enabling product teams to ship things better and faster by building tools, frameworks, libraries et al.

Interestingly, React was created by [Jordan Walke](https://twitter.com/jordwalke) while working as a product engineer on the ads team. You don't have to be an infrastructure engineer to come up with or build such platform solutions. In fact, product engineers work closer to the actual _product_ problems, which an infrastructure engineer might have never encountered.

Product - infrastructure harmony creates the best softwares. You need a good balance of product and infrastructure and of course, good communication. If you're working in product realm you should think how infrastructure can improve what you do and vice-versa.

## Don't be afraid of change

Facebook, at the time, was using an existing internal framework (BoltJS). While this was being used widely, people acknowledged a room for improvement.

With Bolt, it wasn't as easy to understand other people's code _(which is what we do more than writing code)_. With React, there were some new ideas like introduction of rerendering everything, JSX, components, smaller API footprint _(and relying mostly on JS primitives)_.

[Shane O' Sullivan](https://twitter.com/chofter), maintainer of Bolt, played a pivotal part in adopting React over Bolt, which was a difficult choice. He clearly saw the benefits and how well React would scale with people as Facebook grows. From outside perspective, this was a huge risk, which might not have worked out, but it also had potentially huge benefits.

Instead of being satisfied by things, as they are, you should strive for improving them. Change can be good.

## Good documentation drives adoption

[Lee Byron](https://twitter.com/leeb) laid out great points on how documenting the concepts helped in clarifying them for other people which ultimately helped in growing the ideas to teams. People felt involved and a sense of ownership came.

I think this has some interesting points - adoption works best when everyone has _skin in the game_. Soon, from _their_ solution it becomes _our_ solution. Documentation is probably one of the best places to start building that foundation. Good documentation is crucial for adoption and should be a high priority when building infrastructure tools.

## Leadership plays a crucial role

It was quite impressive to learn how well FB leadership at the time supported React as an initiative. As a leader, you should stay close to metal enough to understand the core issues faced by engineering on ground.

You should be able to take risks when the potential rewards in play can be large.

Ads team, at the time, had done a full rewrite of a flow in 6 months using Bolt. They identified there were some complex situations that couldn't be done in Bolt without writing spaghetti code, however it could be done in React without trading off readability. Even if 10% of such cases occurred, it would hurt the org considering the pace FB was growing at. At the time, React wasn't battle tested and lacked feature parity with Bolt. They'd already invested so much on this rewrite so it was a tough call to pause product development for another 4 months to rewrite things in React. Plus, FB stocks at the time were declining, so from business side there was more push to prioritize product development.

Impressively, [Mike Shroepfer](https://twitter.com/schrep), CTO of FB at the time chimed in with full support:

> Make the right technical choice and make the right longterm choice - and if there are short term consequences, I'll back you up. If you need months to do a rewrite, do it.
>
> [Source](https://twitter.com/schrep/status/1625917218809868288)

> This is what technical leaders need to do. You can't just encourage people to think long term, you need to transfer the risks of long term work — or perceived risks — from them to you. Nobody makes great decisions when they’re afraid of failure or focused on the short term.
>
> [Source](https://twitter.com/schrep/status/1625917285037920256)

## Team dynamics

One thing that really stood out was how React's success was a team effort. Different people with different strengths and personalities played a part in making it successful.

## Engineering culture

FB's engineering culture clearly stands out.

[Tom Occhino](https://twitter.com/tomocchino), who was managing the product infrastructure team, mentions:

> Our role was to help other teams and the key indicator of success was the other teams saying, "Yeah, that really helped."

Letting people experiment on their ideas is remarkable - even though they had Bolt, they supported React. One of the reasons so much great OSS has come from FB engineering.

You can't solve future problems because you don't know them. Rewrites are fine, that's how we get generational benefits. Even though Bolt was tried and tested, React paved the way forward and people aligned on doing that rather than undermining things.

## Open source

Open sourcing React was a key moment in the history, as we know it now. Open source needs commitment but it can revolutionize your org and branding.

Tom Occhino mentions that people were saying FB hired great people but had no idea what they were working on. Some would even question why would someone do JS at FB. He clearly saw value in open sourcing React. From very early on, he was working with the management chain and aligning them - if this works for us, we should open source it. He laughingly mentioned - there were lots of meetings and it got a bit controversial but in the end he got the support that was needed. Leadership were onboard to open source it the _right way_.

I think that's a good assessment point - if this works for us, we should consider open sourcing - rather than being afraid about what if we open source this and `<insert>` happens.

Interestingly, first public impression was really bad, everyone hated it initially. People thought there was no future for React outside of FB. Over time though, people saw value and the rest is history.

## Recommended watching

- [Reactjs documentary](https://www.youtube.com/watch?v=8pDqJVdNa44) and [QnA](https://youtu.be/WzRSysq7F4k)
- [JS Apps at Facebook](https://www.youtube.com/watch?v=GW0rj4sNH2w)
- [React: Rethinking best practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY)
