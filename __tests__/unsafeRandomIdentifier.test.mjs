import unsafeRandomIdentifier from "../src/unsafeRandomIdentifier.fn.mjs"
import assert from "assert"

describe("unsafeRandomIdentifier", () => {
	it("should work as expected", () => {
		assert.equal(
			unsafeRandomIdentifier(20).length,
			20
		)
	})
})
