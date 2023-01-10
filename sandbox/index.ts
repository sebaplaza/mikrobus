import { EventBus } from "../src";
type Data = string;

const busName = "MY_BUS";

const options = { restrictForTab: false };
const broadcaster = new EventBus<Data>(busName, options);
const receiver = new EventBus<Data>(busName, options);

receiver.onmessage = (event) => {
	alert(event.data);
};

// @ts-ignore
window.sendHello = () => {
	broadcaster.postMessage("hello from broadcaster");
};
