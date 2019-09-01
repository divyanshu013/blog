---
title: 'Micro and macro task queue'
description: 'Micro and macro task queues within JavaScript’s event loop context'
date: 2019-09-01
categories: ['javascript']
ogImage: ./og-image.png
---

JavaScript's concurrency model is based on an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). JavaScript, by itself, is a **synchronous** and **single-threaded** language. Event loop is what makes it possible to run code asynchronously.

Event loop in _simplest terms_ is just a loop _waiting for events to happen_. It serves the purpose of **pulling tasks** from the **task queue** into the **call stack** when the call stack is **empty**. Browsers have an event loop for each tab and the Node runtime has a single event loop for the running process.

> There is a great talk, **[What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)**, if you're interested in learning more about event loop.

## Micro tasks

An event loop can have [more than one task queues](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue). Besides the (macro) task queue, an event loop also has a **micro task queue**. In its general execution, the event loop would pick up one task from the (macro) task queue and push it to the call stack for execution. In the next iteration it would pick another task from the (macro) task queue and repeat the same. However, this flow will change if there are tasks available on the micro task queue.

If there are tasks present on the micro task queue they would be processed first (in the current iteration of the event loop) till there are none left. After the micro task queue is exhausted the next (macro) task would be processed (in the next event loop iteration).

Some examples of **macro tasks** are - `setTimeout`, `setInterval`, `setImmediate` or user input. Some examples of **micro tasks** are - `Promise` and `process.nextTick`.

> Here is a great talk, **[In the loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0)** which explains micro tasks and event loop with some amazing visuals.

## Examples

When we couple micro tasks with macro tasks certain interesting cases arise.

### Execution order of micro and macro tasks

Micro tasks execute before the macro tasks. Consider this code example, tweaked and borrowed from [here](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/):

```js
setTimeout(function() {
	console.log('setTimeout');
}, 0);

console.log('start');

Promise.resolve()
	.then(function() {
		console.log('promise1');
	})
	.then(function() {
		console.log('promise2');
	});

console.log('end');

// Output:

// 'start'
// 'end'
// 'promise1'
// 'promise2'
// 'setTimeout'
```

If you're already aware about how event loop works you would have correctly guessed that `start` and `end` would be logged before `setTimeout`. Since promises enqueue a micro task the expressions `promise1` and `promise2` are logged before `setTimeout` (which is a macro task). Here's an annotated version of the same code:

```js
// enqueues function on the (macro) task queue
setTimeout(function() {
	console.log('setTimeout');
}, 0);

// will be added to call stack and executed first
console.log('start');

// enqueues tasks to micro task queue
Promise.resolve()
	// thenable is added to the micro task queue
	.then(function() {
		console.log('promise1');
	})
	// similarly this function is also added to micro task queue
	.then(function() {
		console.log('promise2');
	});

console.log('end');
```

### Running sequence of long or repeated tasks

In an event loop iteration, micro tasks are processed till the micro task queue is empty. Since a micro task can create other micro task(s) a **long sequence of micro tasks can block the UI**. This is quite different from a sequence of macro tasks since they're processed in different iterations of the event loop, which gives browser a chance to paint the updated DOM or respond to user input.

The following function will be called recursively infinitely but the UI will remain responsive. You may try this in your browser console if you wish.

```js
function runMacroTask() {
	console.log('Macro task running');
	setTimeout(runMacroTask, 0); // recursively calling the function
}

runMacroTask();
```

However, if we replace the above with a micro task, the UI (and execution thread) will be blocked completely. Careful when pasting this in your browser console as it will make the tab unresponsive.

```js
function runMicroTask() {
	console.log('Micro task running');
	Promise.resolve().then(runMicroTask); // recursively calling the function
}

runMicroTask();
```

## When to use micro tasks

Generally I would recommend using macro tasks for a long sequence of tasks (avoid using `process.nextTick` in Node for the same). Use micro tasks only if the tasks themselves don't create other micro tasks as it would block execution.

Another way to run tasks repeatedly is to use [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) in browsers. Its a great way to execute tasks related to UI. The callback passed to `requestAnimationFrame` is executed only before the browser does the next paint. This can help avoid unnecessary calls since the number of invocations will match the display refresh rate and therefore the function will be called less often than a recursive `setTimeout`.

## External references

Following links are worth checking out if you would like to explore the topic in more depth:

1. [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ), a talk by Philip Roberts
2. [In the loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0), a talk by Jake Archibald as well as his [article](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
3. JavaScript's [concurrency model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
4. NodeJS [event loop, timers and `process.nextTick`](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
5. Task queue [specs](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) and the micro task checkpoint [specs](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint)
