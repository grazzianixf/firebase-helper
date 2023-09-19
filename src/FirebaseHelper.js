const firebaseApp = require("firebase/app");
const firebaseFirestore = require("firebase/firestore");

const { initializeApp } = firebaseApp;

const {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
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
	};

	getById = (collectionName, ...pathSegments) => {
		const docRef = this.getDocRefById(collectionName, ...pathSegments);
		return getDoc(docRef).then((doc) => ({ id: doc.id, ...doc.data() }));
	};

	getDocRefById = (collectionName, ...pathSegments) =>
		doc(this.#firestore, collectionName, ...pathSegments);

	getDocsByPath = async (...pathSegments) => {
		const collectionRef = collection(this.#firestore, ...pathSegments);
		const snapshot = await getDocs(collectionRef);
		const resultList = snapshot.docs.map((doc) => ({
			id: doc.id,
			// ref: doc.ref,
			...doc.data(),
		}));

		return resultList;		
	}

	post = (collectionName, obj, ...pathSegments) =>
		addDoc(collection(this.#firestore, collectionName, ...pathSegments), {
			...obj,
			created: Timestamp.now(),
		});

	put = (collectionName, obj, ...pathSegments) => {
		const { id, ...rest } = obj;
		const docRef = this.getDocRefById(collectionName, ...pathSegments);
		return updateDoc(docRef, { ...rest, updated: Timestamp.now() });
	};

	delete = (collectionName, ...pathSegments) => {
		const docRef = this.getDocRefById(collectionName, ...pathSegments);
		return deleteDoc(docRef);
	};

	search = async (collectionName, searchParams = []) => {
		const collectionRef = collection(this.#firestore, collectionName);
		let searchParamsArray = [];
		searchParams.forEach(({ field, operator, value }) =>
			searchParamsArray.push(where(field, operator, value))
		);
		
		let q = query(collectionRef, ...searchParamsArray);
		// console.log('searchParamsArray', searchParamsArray)
		const snapshot = await getDocs(q);
		const resultList = snapshot.docs.map((doc) => ({
			id: doc.id,
			// ref: doc.ref,
			...doc.data(),
		}));

		return resultList;		
	};

	get app() {
		return this.#app;
	}

	get firestore() {
		return this.#firestore;
	}

};
