const firebaseApp = require("firebase/app");

const { initializeApp } = firebaseApp;

module.exports = class InitializeHelper {
   #app = null;

	constructor(firebaseConfig) {
		this.#app = initializeApp(firebaseConfig);
	}   

	get app() {
		return this.#app;
	}   
}