module.exports = class EntityService {
	#firestoreHelper = null;
	#uid = null;
	#mainCollection = null;
	#pathPattern = null;

	constructor(firestoreHelper, uid, mainCollection, pathPattern) {
		this.#firestoreHelper = firestoreHelper;
		this.#uid = uid;
		this.#mainCollection = mainCollection;
		this.#pathPattern = pathPattern;
	}

	get uid() {
		return this.#uid;
	}

	get mainCollection() {
		return this.#mainCollection;
	}

	getPaths = id => {
		let paths = []

		if (this.#pathPattern) {
			let initialPaths = this.#pathPattern.split("/")
	
			initialPaths.forEach(p => {
				if (p === ":uid") {
					if (this.#uid) {
						paths.push(this.#uid)
					}
				} else if (p === ":id") {
					if (id) {
						paths.push(id)
					}
				} else {
					paths.push(p)
				}
			})
		}

		return paths
	}

	getAll = _ => this.#firestoreHelper.getDocsByPath(this.#mainCollection, ...this.getPaths())

	getById = id => this.#firestoreHelper.getById(this.#mainCollection, ...this.getPaths(id))

	post = obj => this.#firestoreHelper.post(this.#mainCollection, obj, ...this.getPaths())

	put = obj => this.#firestoreHelper.put(this.#mainCollection, obj, ...this.getPaths(obj.id))

	delete = id => this.#firestoreHelper.delete(this.#mainCollection, ...this.getPaths(id))
};