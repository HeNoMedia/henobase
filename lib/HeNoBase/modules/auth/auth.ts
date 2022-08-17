import RequestTypes from '../requests/request';

export default class HeNoAuth {
	#requestTypes: RequestTypes;

	#userData: {
		_id: string;
		username: string;
		verified: boolean;
		createdAt: Date;
		updatedAt: Date;
	} | null;

	#onAuthCallback: (
		user: {
			_id: string;
			username: string;
			verified: boolean;
			createdAt: Date;
			updatedAt: Date;
		} | null
	) => void;

	constructor(requestTypes: RequestTypes) {
		this.#requestTypes = requestTypes;
	}

	onAuthStateChanged(
		callback: (
			user: {
				_id: string;
				username: string;
				verified: boolean;
				createdAt: Date;
				updatedAt: Date;
			} | null
		) => void
	) {
		this.#onAuthCallback = callback;
	}

	/**
	 * Authenticate User
	 * @param username : string
	 * @param password : string
	 * @returns userData : Promise<any>
	 */
	async login(username: string, password: string) {
		let resData = await this.#requestTypes.post('/user/auth', {
			username,
			password,
		});

		if (resData) {
			let userData = resData.data;
			this.#userData = userData;
			this.#onAuthCallback(userData);
			return userData;
		}

		return null;
	}

	/**
	 * Verify User
	 * @param token : string
	 * @param userID : string
	 */

	async verify(token: string, userID: string) {
		let res = await this.#requestTypes.post('/user/verify', {
			token,
			userID,
		});

		return res;
	}

	/**
	 * Create User by username and password
	 * @param username : string
	 * @param password : string
	 * @returns userData : Promise<any>
	 */
	async register(username: string, password: string) {
		let res = await this.#requestTypes.post('/user', {
			username,
			password,
		});
		return res;
	}

	/**
	 * Logout User
	 */
	logout() {
		this.#userData = null;
		this.#onAuthCallback(null);
	}

	/**
	 * Update User
	 * @param data : {username: string, password: string}
	 * @returns boolean : Promise<any>
	 */
	async updateUser(data: any) {
		let res = await this.#requestTypes.patch('/user', {
			data,
		});
		return res?.data;
	}

	/**
	 * Delete User
	 * @returns boolean : Promise<any>
	 */
	async deleteUser() {
		let res = await this.#requestTypes.delete('/user', {});
		this.#userData = null;
		this.#onAuthCallback(null);
		return res;
	}

	/**
	 *
	 * @param username : string
	 * @returns token : Promise<string>
	 */
	async requestPasswordReset(username: string) {
		let res = await this.#requestTypes.post('/user/password/request', {
			username,
		});

		return res;
	}

	/**
	 * Reset User Password
	 * @param token : string
	 * @param password : string
	 * @returns boolean : Promise<any>
	 */
	async resetPasswordByToken(token: string, password: string) {
		let res = await this.#requestTypes.post('/user/password/reset', {
			password,
			token,
		});

		return res;
	}

	/**
	 * Get current User
	 * @returns userData
	 */
	getUser() {
		return this.#userData;
	}
}
