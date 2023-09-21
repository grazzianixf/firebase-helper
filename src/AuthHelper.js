const firebaseAuth = require("firebase/auth");
const SignInResponse = require("./SignInResponse");

const { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } = firebaseAuth;

module.exports = class AuthHelper {
	#app = null;
	#auth = null;

	constructor(app) {
		this.#app = app
		this.#auth = getAuth(this.#app);
	}

	login = (email, password) =>
		signInWithEmailAndPassword(this.#auth, email, password).then(
			(userCredential) => Promise.resolve(new SignInResponse(userCredential))
		);

   // logout TODO
   // onAuthStateChanged TODO
};
