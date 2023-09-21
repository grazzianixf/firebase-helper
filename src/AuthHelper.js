const firebaseApp = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const SignInResponse = require("./SignInResponse");

const { initializeApp } = firebaseApp;
const { getAuth, signInWithEmailAndPassword } = firebaseAuth;

module.exports = class AuthHelper {
	#app = null;
	#auth = null;

	constructor(firebaseConfig) {
		this.#app = initializeApp(firebaseConfig);
		this.#auth = getAuth(this.#app);
	}

	login = (email, password) =>
		signInWithEmailAndPassword(this.#auth, email, password).then(
			(userCredential) => Promise.resolve(new SignInResponse(userCredential))
		);
};
