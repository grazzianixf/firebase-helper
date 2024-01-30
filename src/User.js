const { Utils } = require("@grazzianixf/sdk");

module.exports = class User {
	#uid = null;
	#displayName = null;
	#name = null;
	#email = null;
	#emailVerified = null;
	#phoneNumber = null;
	#photoURL = null;
	#isAnonymous = null;
	#tenantId = null;
	#claims = [];

	constructor(userCredential) {
		let user =
			userCredential && userCredential.user
				? userCredential.user
				: userCredential || {};

		this.#uid = user.uid;
		this.#email = user.email;
		this.#name = user.name;
	}

    addClaim(claim) {
        if (this.#claims.indexOf(claim) == -1) {
            this.#claims.push(claim);
        }

        return this.claims
    }

    addClaims(claims) {
        if (Array.isArray(claims) && claims.length > 0) {
			claims.map(c => this.addClaim(c));            
        }

        return this.claims
    }		

	toString = () => Utils.Object.toString(this, "uid", "email");

	get uid() {
		return this.#uid;
	}

	get email() {
		return this.#email;
	}

	get name() {
		return this.#name;
	}	

    get claims() {
        return this.#claims;
    }
};
