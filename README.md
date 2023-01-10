# MikroBus

MikroBus is a dead simple typed browser event bus.

It uses [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) as backend. Check [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API#browser_compatibility).

By default, the events are scoped to the current tab.

This library is ideal to communicate to/from tabs or iframes.

## API

```ts
constructor(channel: string, options: Partial<MikroBusOptions> = {})
```

Creates a new instance of MikroBus.

- channel: A string that represents the channel name.
- options: An object that allows you to customize the behavior of the MikroBus. This object can contain the following properties:
  - restrictForTab?: (default: true) A boolean that specifies whether the MikroBus should only be used within the current tab.
  - sessionStorageKey?: (default: 'MIKRO_BUS_TAB_ID') A string that represents the key for storing the tab ID in the sessionStorage object.

## Example

```ts
import { MikroBus } from "mikrobus";

// We define a type for our data
type Data = string;

// We define a bus name
const busName = "MY_BUS";

// our options
const options = {
	restrictForTab: false, // here, we are creating a bus between tabs
};

// create broadcaster (this could be anywhere, we only must have the same channel name)
const broadcaster = new MikroBus<Data>(busName, options);

// create receiver (this could be anywhere too, we only must have the same channel name)
const receiver = new MikroBus<Data>(busName, options);

// we attach the event listener
receiver.onmessage = (event) => {
	alert(event.data);
};

// and we broadcast the message
broadcaster.postMessage("hello from broadcaster");
```
