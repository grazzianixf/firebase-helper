const { Utils } = require("@grazzianixf/sdk");
const User = require("./User");

module.exports = class SignInResponse {
	#user = null;
	#accessToken = null;

	constructor(userCredential) {
		this.#user = new User(userCredential);
		this.#accessToken = userCredential.user.accessToken;
	}

	toString = () => Utils.Object.toString(this, "user", "accessToken")

	get user() {
		return this.#user;
	}

	get accessToken() {
		return this.#accessToken;
	}
};
