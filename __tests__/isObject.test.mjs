import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import isObject from "../src/export/isObject.mjs"

describe("isObject", () => {
	test("should work as expected", (expect) => {
		expect(isObject("Hello this is $name")).toBe(false)
		expect(isObject(new String("Hello this is $name"))).toBe(false)
		expect(isObject(1)).toBe(false)
		expect(isObject(true)).toBe(false)
		expect(isObject(new Number())).toBe(false)
		expect(isObject({a: 1})).toBe(true)
	})
})

export default suite
