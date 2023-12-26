import replaceString from "../src/export/replaceString.mjs"
import assert from "assert"

describe("replaceString", () => {
	it("should work as expected", () => {
		assert.equal(
			replaceString("Hello this is $name", "$name", "Max"),
			"Hello this is Max"
		)
	})

	it("should accept arrays for search and replace", () => {
		assert.equal(
			replaceString("Hello this is $name and I'm $age", ["$name", "$age"], ["Max", "22"]),
			"Hello this is Max and I'm 22"
		)
	})

	it("should throw an error if search and replace arrays are not balanced", () => {
		assert.throws(() => {
			replaceString("Hello this is $name and I'm $age", ["$name", "$age"], ["Max"])
		}, {
			message: "'search' and 'replace' input parameters are not balanced."
		})
	})

	it("should accept an object for the search parameter", () => {
		assert.equal(
			replaceString("Hello this is $name and I'm $age", {
				"$name": "Max",
				"$age": "22"
			}),
			"Hello this is Max and I'm 22"
		)
	})

	it("should throw an error if search is an object and replace is given", () => {
		assert.throws(() => {
			replaceString("Hello this is $name and I'm $age", {"$name": "Max", "$age": "22"}, [])
		}, {
			message: "Cannot specify parameter 'replace' when 'search' is an object."
		})
	})

})
