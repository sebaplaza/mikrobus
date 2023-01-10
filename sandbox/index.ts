import { EventBus } from "../src/event-bus";
type Data = string;

const options = { restrictForTab: false };
const broadcaster = new EventBus<Data>("Consumer", options);
const messageReceiver = new EventBus<Data>("Consumer", options);

messageReceiver.onmessage = (event) => {
	alert(event.data);
};

broadcaster.postMessage("hello");
