---
title: 'Takeaways from creation of React'
description: 'Lessons beyond purely technical side of things from creation of one of the most popular frontend frameworks'
date: 2023-02-18
categories: ['software-engineering']
ogImage: ./og-image.png
---

While watching the wonderful [react.js documentary](https://www.youtube.com/watch?v=8pDqJVdNa44), even more than purely technical marvel, I was impressed much more by things beyond code that made React possible - people, teams, leadership.

## Product and Infrastructure harmony

In larger orgs, generally there are separate product and infrastructure (or platform) teams. While product teams primarily focus on building product features, infrastructure teams primarily focus on enabling product teams to ship things better and faster by building tools, frameworks, libraries et al.

Interestingly, React was created by [Jordan Walke](https://twitter.com/jordwalke) while working as a product engineer on the ads team. You don't have to be an infrastructure engineer to come up with or build such platform solutions. In fact, product engineers work closer to the actual _product_ problems, which an infrastructure engineer might have never encountered.

Product - infrastructure harmony creates the best softwares. You need a good balance of product and infrastructure and of course, good communication. If you're working in product realm you should think how infrastructure can improve what you do and vice-versa.

## Don't be afraid of change

Facebook, at the time, was using an existing internal framework (BoltJS). While this was being used widely, people acknowledged a room for improvement.

With Bolt, it wasn't as easy to understand other people's code _(which is what we do more than writing code)_. With React, there were some new ideas like introduction of rerendering everything, JSX, components, smaller API footprint _(and relying mostly on JS primitives)_.

[Shane O' Sullivan](https://twitter.com/chofter), maintainer of Bolt, played a pivotal part in adopting React over Bolt, which was a difficult choice. He clearly saw the benefits and how well React would scale with people as Facebook grows. From outside perspective, this was a huge risk, which might not have worked out, but it also had potentially huge benefits.

Instead of being satisfied by things, as they are, you should strive for improving them. Change can be good.

## Documentation and adoption

[Lee Byron](https://twitter.com/leeb) laid out great points on how documenting the concepts helped in clarifying them for other people which ultimately helped in growing the ideas to teams. People felt involved and a sense of ownership came.

I think this has some interesting points - adoption works best when everyone has _skin in the game_. Soon, from _their_ solution it becomes _our_ solution. Documentation is probably one of the best places to start building that foundation.

## Leadership

Leadership - staying close to metal, understanding the core issues

- you should take risks when the potential rewards in play can be large

product infrastructure team - tom ochino says

- help other teams and key indicator of success the other team saying yeah that really helped

FB gets talked shit but:

- Letting people experiment on their ideas is remarkable
- Two frontend frameworks
- ads team had done a recent full rewrite of a flow in 6 months
  - identified there were some complex situations that couldn't be done in bolt without writing spaghetti code but could be done in react
  - even if 10% such cases come up, it would hurt the org
  - react wasn't battle tested and lacked features
  - already invested so much on org side though in this rewrite so couldn't pause product development for 4 months. facebook stocks were declining
  - cto - make the right technical and longterm decisions, I'll back you up, if you need to puase prod dev for 4 months you can
    - [Tweet](https://twitter.com/schrep/status/1625917285037920256?s=20)
  - was definitely challenging - people problems increase as you grow, code is still objective, people is where subjectivity comes in and with it comes opinions, more opinions, harder to make decisions

You can't solve future problems because you don't know them. Rewrites are fine, that's how we get generational benefits. Even though bolt was tried and tested, react paved the way forward and people aligned on doing that rather than undermining things.

Ideas are much more resilient than code. React might not last forever but the ideas will and help evolve next set of tools.

Open source can revolutionaize your org / branding:

- tom ochino - says people saying fb hired great people but had no idea what they were working on. From people saying why would you do javascript at facebook to now.
- from very early on, working with the management chain early on and aligning them on - if this works for us we should open source it. that's a good assessment point, rather than being afraid of what if we open source this and ...
  - lots of meetings, bit controversial but got the support that was needed
- documentation is the king
- leadership support man, we'll do open source the right way - instead of open sourcing things and letting them rot

## Open source

Open sourcing React was a key moment in the history, as we know it now. 

## Team dynamics

One thing that really stood out was how React's success was a team effort. Different people with different strengths and personalities played a part in making it successful.

public

- everyone hated it initially lol [[JSConfUS 2013] Tom Occhino and Jordan Walke: JS Apps at Facebook - YouTube](https://www.youtube.com/watch?v=GW0rj4sNH2w)
- you got to go past the initial hate
- people thought there was no future outside fb for react

questioned the status quo - have your html, css, js separate - model, view, controller but React said, have them in components

bret victor inventing on principle still the real of a talk

react actually did something that revolutionazied. I'm eternally grateful. React might not last forever but it made a massive impact on my life. Power of oSS

rewrite is a natural progression of software, embrace it. eg. react 16 needed a rewrite to become what it is today

## References

- [Reactjs documentary](https://www.youtube.com/watch?v=8pDqJVdNa44) and [QnA](https://youtu.be/WzRSysq7F4k)
- [JS Apps at Facebook](https://www.youtube.com/watch?v=GW0rj4sNH2w)
- [React: Rethinking best practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY)
