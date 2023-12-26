import unsafeRandomIdentifier from "../src/export/unsafeRandomIdentifier.mjs"
import assert from "assert"

describe("unsafeRandomIdentifier", () => {
	it("should work as expected", () => {
		assert.equal(
			unsafeRandomIdentifier(20).length,
			20
		)
	})
})
