---
title: 'HTTP Requests'
description: 'Behavior and properties of different HTTP request methods'
date: 2019-12-08
categories: ['web']
ogImage: ./og-image.png
---

> [**Hypertext Transfer Protocol (HTTP)**](https://developer.mozilla.org/en-US/docs/Web/HTTP) is an [application-layer](https://en.wikipedia.org/wiki/Application_layer) protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes.

In short, HTTP makes client and server communication possible, which is how most web applications work. In order to facilitate this communication, HTTP comes with a set of [**request methods**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (a.k.a HTTP verbs). In this post, I'll list down the most commonly used methods and their behavior _(good interview revision)_.

## Request methods

**All these are conventions, meaning its up to the server to follow them.** For example, it's possible to create a new resource on a `GET` request but conventionally we only use `GET` for fetching data (without modification of any server resource).

1. [**GET**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) - for fetching data or a resource
2. [**POST**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) - for sending data or creating a resource.
3. [**PUT**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) - for creating a new resource or updating (replacing) the target resource (completely) with the request payload.
4. [**PATCH**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) - for partially modifying the target resource with the request payload.
5. [**DELETE**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) - for deleting the target resource.
6. [**OPTIONS**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) - for describing the communication options for the target resource. Mostly uses request and response headers for communication. Commonly used in [preflight requests for CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS#Examples).
7. [**HEAD**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) - for fetching only headers for the target resource or endpoint. These should be the same headers which would have been sent for a `GET` request. Conventionally, body shouldn't be send in a `HEAD` request; if sent it should be ignored. `HEAD` can be used to decide whether to request the complete resource or not (for example fetching a large file).
8. [**CONNECT**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT) - for initiating a two-way communication tunnel to the target resource.
9. [**TRACE**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE) - for a message loop-back test along the path to the target resource (for debugging purposes).

## Safe methods

[**Safe HTTP methods**](https://developer.mozilla.org/en-US/docs/Glossary/safe) perform no side effects on the server, they're used only for read operations. They're therefore also **idempotent**, same request when fired multiple times causes no additional changes on the server.

For example, performing a `GET` request to fetch some resource should cause no side effect on the server (say `GET /albums`), whereas a `POST` or `PUT` would end up creating or updating a resource (say `POST /albums` or `PUT /albums/definitely-maybe`).

**Safe**: `GET`, `HEAD`, `OPTIONS`

**Unsafe**: `POST`, `PUT`, `DELETE`

## Idempotent methods

[These](https://developer.mozilla.org/en-US/docs/Glossary/idempotent) are methods which can be performed any number of times and cause no additional change on the server despite being called many times. The first request can cause a side effect but when the same request is sent multiple times, it should cause no additional change and return similar response.

For example, performing the same `PUT` request with payload would cause no additional change to the resource (say `PUT /albums/imagine` with payload `{ "artist": "John Lennon" }`). Similarly a `DELETE` request to the same endpoint would delete the resource on the first request and subsequent requests would return `404` as the resource would have been deleted (say `DELETE /albums/wandering-star`).

> All safe methods are idempotent but not vice-versa.

**Idempotent**: `GET`, `PUT`, `DELETE`

**Non idempotent**: `POST`, `PATCH`

## PUT or POST

Use `POST` when the endpoint doesn't specify the target resource, for example `POST /albums` would create a new album on the server. On the other hand, prefer `PUT` when the target resource is specified, for example `PUT /albums/bryan-adams`.

Another way of looking at this is `PUT` should guarantee idempotence. If the same request can be fired multiple times without creating any additional side effect on the server (besides the first time) it should be a `PUT`. If the same request when fired multiple times creates a new resource (or any other side effect for that matter), its better suited for a `POST`. [This](https://stackoverflow.com/questions/630453/put-vs-post-in-rest) StackOverflow thread goes into much more details.

## PATCH or PUT

`PUT` is idempotent and `PATCH` is not. [This](https://stackoverflow.com/questions/28459418/rest-api-put-vs-patch-with-real-life-examples) StackOverflow thread has great examples on when to use which. It also explains when `PATCH` can be idempotent and non idempotent.
