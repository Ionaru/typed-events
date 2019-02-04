# @ionaru/typed-events

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
