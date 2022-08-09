import RequestTypes from '../requests/request';

export default class HeNoAuth {
	#requestTypes: RequestTypes;

	userData: any;

	constructor(requestTypes: RequestTypes) {
		this.#requestTypes = requestTypes;
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
			this.userData = userData;
			return userData;
		}

		return null;
	}

	/**
	 * Create User by username and password
	 * @param username : string
	 * @param password : string
	 * @returns userData : Promise<any>
	 */
	register(username: string, password: string) {
		return this.#requestTypes.post('/user', {
			username,
			password,
		});
	}

	/**
	 * Logout User
	 */
	logout() {
		this.userData = null;
	}

	/**
	 * Update User
	 * @param data : {username: string, password: string}
	 * @returns boolean : Promise<any>
	 */
	updateUser(data: any) {
		return this.#requestTypes.patch('/user', {
			data,
		});
	}

	/**
	 * Delete User
	 * @returns boolean : Promise<any>
	 */
	deleteUser() {
		return this.#requestTypes.delete('/user', {});
	}

	/**
	 *
	 * @param username : string
	 * @returns token : Promise<string>
	 */
	requestPasswordReset(username: string) {
		return this.#requestTypes.post('/user/password/request', {
			username,
		});
	}

	/**
	 * Reset User Password
	 * @param token : string
	 * @param password : string
	 * @returns boolean : Promise<any>
	 */
	resetPasswordByToken(token: string, password: string) {
		return this.#requestTypes.post('/user/password/reset', {
			password,
			token,
		});
	}

	/**
	 * Get current User
	 * @returns userData
	 */
	getUser() {
		return this.userData;
	}
}
