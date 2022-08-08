import HeNoAuth from '../auth/auth';
import HeNoBaseDB from '../database/henobaseDB';
import RequestTypes from '../requests/request';

export default class HeNoBaseConnection {
	#connetionURL: string;
	#apiKey: string;

	requestTypes: RequestTypes;

	#offlineSupport: boolean = true;

	constructor(config: {connectionURL: string; apiKey: string}) {
		this.#connetionURL = config.connectionURL;
		this.#apiKey = config.apiKey;

		this.#connect();
	}

	// INFO: Server Connect and Disconnect Events

	async #connect() {
		this.requestTypes = new RequestTypes({
			connectionURL: this.#connetionURL,
			apiKey: this.#apiKey,
			offlineSupport: this.#offlineSupport,
		});
	}

	// INFO: Auth Module
	auth() {
		return new HeNoAuth(this.requestTypes);
	}

	// Info: Database Module

	db() {
		return new HeNoBaseDB(this.requestTypes);
	}
}
