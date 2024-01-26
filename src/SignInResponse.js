const { Utils } = require("@grazzianixf/sdk");
const User = require("./User");

module.exports = class SignInResponse {
	#user = null;
	#accessToken = null;
	#userCredential = null;

	constructor(userCredential) {
		this.#user = new User(userCredential);
		this.#accessToken = userCredential.user.accessToken;
		this.#userCredential = userCredential;
	}

	toString = () => Utils.Object.toString(this, "user", "accessToken")

	get user() {
		return this.#user;
	}

	get accessToken() {
		return this.#accessToken;
	}

	get userCredential() {
		return this.#userCredential;
	}
};
