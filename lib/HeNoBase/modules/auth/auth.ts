import RequestTypes from '../requests/request';

export default class HeNoAuth {
	#requestTypes: RequestTypes;

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
			let token = resData.token;
			let userData = resData.user;

			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(userData));
			return resData.user;
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
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	/**
	 * Update User
	 * @param data : {username: string, password: string}
	 * @returns boolean : Promise<any>
	 */
	updateUser(data: any) {
		return this.#requestTypes.patch(
			'/user',
			{
				data,
			},
			{
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		);
	}

	/**
	 * Delete User
	 * @returns boolean : Promise<any>
	 */
	deleteUser() {
		return this.#requestTypes.delete('/user', {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		});
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
			token,
			password,
		});
	}

	/**
	 * Get current User
	 * @returns userData
	 */
	getUser() {
		let data = '{}';
		if (typeof window !== 'undefined') {
			data = localStorage.getItem('user') || '{}';
		}

		return JSON.parse(data);
	}
}
