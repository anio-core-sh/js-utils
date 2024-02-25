import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import isString from "../src/export/isString.mjs"

describe("isString", () => {
	test("should work as expected", (expect) => {
		expect(isString("Hello this is $name")).toBe(true)
		expect(isString(new String("Hello this is $name"))).toBe(true)
		expect(isString(1)).toBe(false)
		expect(isString(true)).toBe(false)
		expect(isString(new Number())).toBe(false)
		expect(isString({a: 1})).toBe(false)
	})
})

export default suite
