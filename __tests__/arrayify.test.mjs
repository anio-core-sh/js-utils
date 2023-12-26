import arrayify from "../src/export/arrayify.mjs"
import assert from "assert"

describe("arrayify", () => {
	it("should work as expected", () => {
		assert.deepEqual(arrayify(1), [1])
		assert.deepEqual(arrayify([1]), [1])

		assert.deepEqual(arrayify("a"), ["a"])
		assert.deepEqual(arrayify(["a", "b"]), ["a", "b"])

		assert.deepEqual(arrayify({a:1}), [{a:1}])
	})
})
