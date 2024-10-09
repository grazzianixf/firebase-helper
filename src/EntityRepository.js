const { Object } = require("../../sdk/src/Utils");

module.exports = class EntityRepository {
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

	getPaths = params => {
		let paths = []

		if (this.#pathPattern) {
			let path = this.#pathPattern.replace(":uid", this.#uid);

			if (params && Object.isObject(params)) {
				for (const key in params) {
					path = path.replace(`:${key}`, params[key]);
				}
			}

			paths = path.split("/");
		}

		return paths
	}

	getAll = params => this.#firestoreHelper.getDocsByPath(this.#mainCollection, ...this.getPaths({ ...params, id: '' }))

	getById = params => this.#firestoreHelper.getById(this.#mainCollection, ...this.getPaths(params))

	post = (obj, params) => this.#firestoreHelper.post(this.#mainCollection, obj, ...this.getPaths({ ...params, id: '' }))

	put = (obj, params) => this.#firestoreHelper.put(this.#mainCollection, obj, ...this.getPaths(params))

	delete = params => this.#firestoreHelper.delete(this.#mainCollection, ...this.getPaths(params))
};