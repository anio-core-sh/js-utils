import isObject from "../src/export/isObject.mjs"
import assert from "assert"

describe("isObject", () => {
	it("should work as expected", () => {
		assert.equal(isObject("Hello this is $name"), false)
		assert.equal(isObject(new String("Hello this is $name")), false)
		assert.equal(isObject(1), false)
		assert.equal(isObject(true), false)
		assert.equal(isObject(new Number()), false)
		assert.equal(isObject({a: 1}), true)
	})
})
