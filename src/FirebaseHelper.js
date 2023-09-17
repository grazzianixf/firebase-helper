const firebaseApp = require("firebase/app");
const { initializeApp } = firebaseApp;
const firebaseFirestore = require("firebase/firestore");
const {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
	Timestamp,
} = firebaseFirestore;

module.exports = class FirebaseHelper {
	#app = null;
	#firestore = null;

	constructor(firebaseConfig) {
		this.#app = initializeApp(firebaseConfig);
		this.#firestore = getFirestore(this.#app);
	}

	getAll = async (collectionName) => {
		const collectionRef = collection(this.#firestore, collectionName);
		const snapshot = await getDocs(collectionRef);
		const resultList = snapshot.docs.map((doc) => ({
			id: doc.id,
			// ref: doc.ref,
			...doc.data(),
		}));

		return resultList;
	}

	getById = (collectionName, id) => {
		const docRef = this.getDocRefById(collectionName, id);
		return getDoc(docRef).then((doc) => ({ id: doc.id, ...doc.data() }));
	};

	getDocRefById = (collectionName, id) => doc(this.#firestore, collectionName, id);	

	post = (collectionName, obj) =>
		addDoc(collection(this.#firestore, collectionName), {
			...obj,
			created: Timestamp.now(),
		});

	put = (collectionName, obj) => {
		const { id, ...rest } = obj;
		const docRef = this.getDocRefById(collectionName, id);
		return updateDoc(docRef, { ...rest, updated: Timestamp.now() });
	};

	delete = (collectionName, id) => {
		const docRef = this.getDocRefById(collectionName, id);
		return deleteDoc(docRef);
	}

	get app() {
		return this.#app;
	}

	get firestore() {
		return this.#firestore;
	}
};
