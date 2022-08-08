class ConnectionError extends Error {
	constructor() {
		super();
		this.name = 'HeNoBase - Connection Error';
		this.message = 'Could not connect to server.';
	}
}

class ResponseError extends Error {
	constructor(requestType: string, result: any) {
		super();
		this.name = 'HeNoBase - Response Error';
		this.message = `${requestType} failed: ${
			result.data?.message || 'Verbindung fehlgeschlagen'
		}`;
	}
}

class CollectionNameError extends Error {
	constructor() {
		super();
		this.name = 'HeNoBase - Collection Name Error';
		this.message = 'No collection name provided.';
	}
}

export {ConnectionError, ResponseError, CollectionNameError};
