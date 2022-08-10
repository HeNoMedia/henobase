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

	onAuthChange: (
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
			let userData = resData.data.data;
			this.#userData = userData;
			this.onAuthChange(userData);
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
	async register(username: string, password: string) {
		let res = await this.#requestTypes.post('/user', {
			username,
			password,
		});
		return res?.data;
	}

	/**
	 * Logout User
	 */
	logout() {
		this.#userData = null;
		this.onAuthChange(null);
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
		this.onAuthChange(null);
		return res?.data;
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

		return res?.data;
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

		return res?.data;
	}

	/**
	 * Get current User
	 * @returns userData
	 */
	getUser() {
		return this.#userData;
	}
}
