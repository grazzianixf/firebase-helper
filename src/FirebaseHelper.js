const firebaseApp = require("firebase/app");
const { initializeApp } = firebaseApp;
const firebaseFirestore = require("firebase/firestore");
const { getFirestore, collection, getDocs } = firebaseFirestore;

module.exports = class FirebaseHelper {
   #app = null;
   #firestore = null;

	constructor(firebaseConfig) {
      this.#app = initializeApp(firebaseConfig);
      this.#firestore = getFirestore(this.#app);      
	}

	async getAll(collectionName) {
		const resultCollection = collection(this.#firestore, collectionName);
		const snapshot = await getDocs(resultCollection);
		const resultList = snapshot.docs.map((doc) => ({
			id: doc.id,
			data: doc.data(),
		}));

		return resultList;
	}

   get app() {
      return this.#app;
   }

   get firestore() {
      return this.#firestore;
   }   
};
