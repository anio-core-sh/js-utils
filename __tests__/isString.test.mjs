import isString from "../src/isString.fn.mjs"
import assert from "assert"

describe("isString", () => {
	it("should work as expected", () => {
		assert.equal(isString("Hello this is $name"), true)
		assert.equal(isString(new String("Hello this is $name")), true)
		assert.equal(isString(1), false)
		assert.equal(isString(true), false)
		assert.equal(isString(new Number()), false)
		assert.equal(isString({a: 1}), false)
	})
})
