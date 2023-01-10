import { MikroBus } from "../src";
type Data = string;

const busName = "MY_BUS";

const options = { restrictForTab: false };
const broadcaster = new MikroBus<Data>(busName, options);
const receiver = new MikroBus<Data>(busName, options);

receiver.onmessage = (event) => {
	alert(event.data);
};

// @ts-ignore
window.sendHello = () => {
	broadcaster.postMessage("hello from broadcaster");
};
