type EventBusOptions = {
	restrictForTab: boolean;
	sessionStorageKey: string;
};

const defaultValues: EventBusOptions = {
	restrictForTab: true,
	sessionStorageKey: "EVENT_BUS_TAB_ID",
};

interface EventBus<T> extends BroadcastChannel {
	onmessage: (message: MessageEvent<T>) => void;
}

class EventBus<T> extends BroadcastChannel implements EventBus<T> {
	#options: EventBusOptions;

	constructor(channel: string, options: Partial<EventBusOptions> = {}) {
		const mergedOptions = { ...defaultValues, ...options, channel };
		const sessionId = EventBus.#getSessionId(mergedOptions.sessionStorageKey);
		if (mergedOptions.restrictForTab) {
			mergedOptions.channel = `${mergedOptions.channel}#${sessionId}`;
		}
		super(mergedOptions.channel);
		this.#options = { ...mergedOptions };
	}

	static #getSessionId(key: string) {
		let id = sessionStorage.getItem(key);
		if (!id) {
			id = Date.now().toString();
			sessionStorage.setItem(key, id);
		}
		return id;
	}

	postMessage(data: T) {
		super.postMessage(data);
	}
}

export { EventBus };
