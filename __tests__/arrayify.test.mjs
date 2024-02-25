import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import arrayify from "../src/export/arrayify.mjs"

describe("arrayify", () => {
	test("should work as expected", (expect) => {
		expect(arrayify(1)).toEqual([1])
		expect(arrayify([1])).toEqual([1])

		expect(arrayify("a")).toEqual(["a"])
		expect(arrayify(["a", "b"])).toEqual(["a", "b"])

		expect(arrayify({a:1})).toEqual([{a:1}])
	})
})

export default suite
