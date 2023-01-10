type MikroBusOptions = {
	restrictForTab: boolean;
	sessionStorageKey: string;
};

const defaultValues: MikroBusOptions = {
	restrictForTab: true,
	sessionStorageKey: "MIKRO_BUS_TAB_ID",
};

interface MikroBus<T> extends BroadcastChannel {
	onmessage: (message: MessageEvent<T>) => void;
}

class MikroBus<T> extends BroadcastChannel implements MikroBus<T> {
	#options: MikroBusOptions;

	/**
	 *
	 * Creates a new instance of `EventBus`.
	 *
	 * @param {string} channel - A string that represents the channel name.
	 * @param {Partial<EventBusOptions>} [options={}] - An object that allows you to customize the behavior of the `EventBus`. This object can contain the following properties:
	 *      - `restrictForTab`: (default: true) A boolean that specifies whether the `EventBus` should only be used only within the current tab.
	 *      - `sessionStorageKey`: (default: 'MIKRO_BUS_TAB_ID') A string that represents the key for storing the session ID in the `sessionStorage` object.
	 *      - All other properties of the `EventBusOptions` interface.
	 */
	constructor(channel: string, options: Partial<MikroBusOptions> = {}) {
		const mergedOptions = { ...defaultValues, ...options, channel };
		const sessionId = MikroBus.#getSessionId(mergedOptions.sessionStorageKey);
		if (mergedOptions.restrictForTab) {
			mergedOptions.channel = `${mergedOptions.channel}#${sessionId}`;
		}
		super(mergedOptions.channel);
		this.#options = { ...mergedOptions };
	}

	/**
	 * @private
	 * @static
	 * Gets the session ID for the current tab.
	 *
	 * @param {string} key - A string that represents the key for storing the session ID in the `sessionStorage` object.
	 *
	 * @returns {string} -  A string that represents the session ID.
	 */
	static #getSessionId(key: string) {
		let id = sessionStorage.getItem(key);
		if (!id) {
			id = Date.now().toString();
			sessionStorage.setItem(key, id);
		}
		return id;
	}

	/**
	 * Posts a message to the channel.
	 *
	 * @param {T} data - The message to be sent. The type of this parameter is determined by the type parameter `T` of the `EventBus` class.
	 */
	postMessage(data: T) {
		super.postMessage(data);
	}
}

export { MikroBus };
