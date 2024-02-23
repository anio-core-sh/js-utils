import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import unsafeRandomIdentifier from "../src/export/unsafeRandomIdentifier.mjs"

describe("unsafeRandomIdentifier", () => {
	test("should work as expected", (expect) => {
		expect(
			unsafeRandomIdentifier(20).length
		).toBe(
			20
		)
	})
})

export default suite
