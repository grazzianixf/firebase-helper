const { Utils } = require("@grazzianixf/sdk");

module.exports = class User {
	#uid = null;
	#displayName = null;
	#email = null;
	#emailVerified = null;
	#phoneNumber = null;
	#photoURL = null;
	#isAnonymous = null;
	#tenantId = null;

	constructor(userCredential) {
		let user =
			userCredential && userCredential.user
				? userCredential.user
				: userCredential || {};

		this.#uid = user.uid;
		this.#email = user.email;
	}

	toString = () => Utils.Object.toString(this, "uid", "email");

	get uid() {
		return this.#uid;
	}

	get email() {
		return this.#email;
	}
};
