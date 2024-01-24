const firebaseAuth = require("firebase/auth");
const SignInResponse = require("./SignInResponse");
const User = require("./User");

const { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser } =
	firebaseAuth;

module.exports = class AuthHelper {
	#app = null;
	#auth = null;
	#user = null;

	constructor(app) {
		this.#app = app;
		this.#auth = getAuth(this.#app);
	}

	login = (email, password) =>
		signInWithEmailAndPassword(this.#auth, email, password).then(
			(userCredential) => Promise.resolve(new SignInResponse(userCredential))
		);

	onAuthChange = (callback) => onAuthStateChanged(this.#auth, (user) => {
		let isLogged = null;

		if (user) {
			isLogged = true;
			this.#user = user;
		} else {
			isLogged = false;
			this.#user = null;
		}

		callback && callback(isLogged, new User(user));
	});

	logout = (_) => signOut(this.#auth);

	// setAdmin = uid => updateCurrentUser()
};
