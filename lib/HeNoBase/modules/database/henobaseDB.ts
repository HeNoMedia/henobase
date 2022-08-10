import {CollectionNameError} from '../error/error';
import RequestTypes from '../requests/request';

class HeNoBaseDB {
	#requestTypes: RequestTypes;

	#collectionName: string = '';

	#sort: any = {};

	#queryData: any = {};

	constructor(requestTypes: RequestTypes) {
		this.#requestTypes = requestTypes;
	}

	/**
	 * Set Collection to use
	 * @param collectionName : string
	 */
	collection(collectionName: string) {
		this.#collectionName = collectionName;
		return this;
	}

	// ---------   Getter Methods  ------------  //

	// get

	/**
	 * Get One Entry from Collection.
	 * The data can be ordered and filtered with params
	 * @returns Promise<RequestTypes>
	 */
	async get() {
		if (!this.#collectionName) {
			throw new CollectionNameError();
		}

		let params = {
			query: this.#queryData,
			sort: this.#sort,
		};

		let res = await this.#requestTypes.post(
			`/db/${this.#collectionName}/get`,
			params
		);
		return res?.data;
	}

	// get All

	/**
	 * Get All Entrys from Collection.
	 * The data can be ordered and filtered with params
	 * @returns Promise<RequestTypes>
	 */
	async getAll(limit: number = 0) {
		if (!this.#collectionName) {
			throw new CollectionNameError();
		}

		let params = {
			query: this.#queryData,
			sort: this.#sort,
			limit: limit === 0 ? undefined : limit,
		};

		let res = await this.#requestTypes.post(
			`/db/${this.#collectionName}/get/all`,
			params
		);
		return res?.data;
	}

	// get By ID
	/**
	 * Get Entry by ID from collection
	 * @param id: string
	 * @returns Promise<RequestTypes>
	 */
	async getByID(id: string) {
		if (!this.#collectionName) {
			throw new CollectionNameError();
		}

		let res = await this.#requestTypes.get(`/db/${this.#collectionName}/${id}`);
		return res?.data;
	}

	// ---------   Query Methods   ------------  //

	/**
	 * Add MongoDB Query
	 * @param query: any
	 */
	where(query: any) {
		this.#queryData = query;
		return this;
	}

	// Order By
	/**
	 * Order Entries by a specific Field
	 * @param sort: any
	 */
	orderBy(sort: any) {
		this.#sort = sort;

		return this;
	}

	// ---------   Updating Methods without Query   ------------  //

	/**
	 * Insert Entry to Collection
	 * @returns Promise<RequestTypes>
	 */
	async insert(data: any) {
		if (!this.#collectionName) {
			throw new CollectionNameError();
		}

		let res = await this.#requestTypes.post(
			`/db/${this.#collectionName}/insert`,
			data
		);
		return res?.data;
	}

	/**
	 * Update Entry by ID
	 * @returns Promise<RequestTypes>
	 */
	async updateByID(id: string, data: any) {
		if (!this.#collectionName) {
			throw new CollectionNameError();
		}
		let res = await this.#requestTypes.patch(
			`/db/${this.#collectionName}/${id}`,
			data
		);
		return res?.data;
	}

	/**
	 * Delete Entry by ID
	 * @returns Promise<RequestTypes>
	 */
	async deleteByID(id: string) {
		if (!this.#collectionName) {
			throw new CollectionNameError();
		}
		let res = await this.#requestTypes.delete(
			`/db/${this.#collectionName}/${id}`
		);
		return res?.data;
	}
}

export default HeNoBaseDB;
