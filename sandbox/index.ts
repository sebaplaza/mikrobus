import { EventBus } from "../src/event-bus";
type Data = string;

const busName = "MY_BUS";

const options = { restrictForTab: false };
const broadcaster = new EventBus<Data>(busName, options);
const receiver = new EventBus<Data>(busName, options);

receiver.onmessage = (event) => {
	alert(event.data);
};

window.sendHello = () => {
	broadcaster.postMessage("hello from broadcaster");
};
