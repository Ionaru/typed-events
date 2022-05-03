# @ionaru/typed-events

[![npm version](https://img.shields.io/npm/v/@ionaru/typed-events.svg?style=for-the-badge)](https://www.npmjs.com/package/@ionaru/typed-events)
[![npm version](https://img.shields.io/npm/v/@ionaru/typed-events/next.svg?style=for-the-badge)](https://www.npmjs.com/package/@ionaru/typed-events/v/next)
[![Build Status](https://img.shields.io/github/workflow/status/ionaru/typed-events/Test%20&%20Deploy/master?style=for-the-badge)](https://github.com/Ionaru/typed-events/actions)

## Description
A tiny package that provides a very simple event system with Typescript support.

## Usage
```
npm install @ionaru/typed-events
```

```ts
import { TypedEvent } from '@ionaru/typed-events';

// Create a new event.
const myEvent = new TypedEvent<string>();

// Create a listener and subscribe to the event.
const listener = (message) => console.log(message);
myEvent.on(listener);

// Emit to notify all listeners.
myEvent.emit('Something happened!')

// console.log: 'Something happened!'
```
