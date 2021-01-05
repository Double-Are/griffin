const Find = require("./find")
const Insert = require("./insert")
const Delete = require("./delete")

/*
 * A document collection with a standardized schema
 */
function Collection(SEA, db, name, key) {
	const col = db.get("$" + name)

	function find(query, options) {
		query = query || {}
		options = options || {}
		options.sort = options.sort || {}
		options.skip = options.skip || 0
		options.limit = options.limit || 0
		options.fields = options.fields || {}
		return Find(SEA, col, key, query, options)
	}

	function insert(docs, options) {
		docs = docs || {}
		options = options || {}
		options.ordered = options.ordered || false
		return Insert(SEA, col, key, docs, options)
	}

	function delete_(query, options) {
		query = query || {}
		options = options || {}
		options.limit = options.limit || 0
		return Delete(SEA, col, key, query, options)
	}

	function drop() {
		col.put(null)
	}

	return {
		find,
		insert,
		delete: delete_,
		drop,
	}
}

module.exports = Collection
