import axios from 'axios';
import {ConnectionError, ResponseError} from '../error/error';

export default class RequestTypes {
	#connetionURL: string;
	#apiKey: string;

	#offlineSupport: boolean;

	#isOnline: boolean;

	preDefinedHeader: any;

	constructor(config: {
		connectionURL: string;
		apiKey: string;
		offlineSupport: boolean;
	}) {
		this.#connetionURL = config.connectionURL;
		this.#apiKey = config.apiKey;
		this.#offlineSupport = config.offlineSupport;
		this.#isOnline = true;

		this.preDefinedHeader = {
			'Content-Type': 'application/json',
			'X-Api-Key': this.#apiKey,
		};
	}

	// Post
	async post(url: string, data: any, additionalHeader?: any) {
		try {
			if (!this.#isOnline) {
				throw new ConnectionError();
			}

			let response = await axios.post(this.#connetionURL + url, data, {
				headers: {
					...this.preDefinedHeader,
					...additionalHeader,
				},
			});

			if (response.status !== 200) {
				throw new ResponseError('POST', response);
			}

			return response.data;
		} catch (error: any) {
			console.error(new ResponseError('POST', error.response));
		}
	}

	// Get
	async get(url: string, additionalHeader?: any) {
		try {
			if (!this.#isOnline) {
				throw new ConnectionError();
			}

			let response = await fetch(this.#connetionURL + url, {
				method: 'GET',
				headers: {
					...this.preDefinedHeader,
					...additionalHeader,
				},
				mode: 'no-cors',
			});

			if (response.status !== 200) {
				throw new ResponseError('Get', await response.text());
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	// Patch
	async patch(url: string, data: any, additionalHeader?: any) {
		try {
			if (!this.#isOnline) {
				throw new ConnectionError();
			}

			let response = await fetch(this.#connetionURL + url, {
				method: 'PATCH',
				headers: {
					...this.preDefinedHeader,
					...additionalHeader,
				},
				body: JSON.stringify(data),
				mode: 'no-cors',
			});

			if (response.status !== 200) {
				throw new ResponseError('Patch', await response.text());
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	// Delete
	async delete(url: string, additionalHeader?: any) {
		try {
			if (!this.#isOnline) {
				throw new ConnectionError();
			}

			let response = await fetch(this.#connetionURL + url, {
				method: 'DELETE',
				headers: {
					...this.preDefinedHeader,
					...additionalHeader,
				},
				mode: 'no-cors',
			});

			if (response.status !== 200) {
				throw new ResponseError('Delete', await response.text());
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}
}
