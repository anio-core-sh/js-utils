import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import replaceString from "../src/export/replaceString.mjs"

describe("replaceString", () => {
	test("should work as expected", (expect) => {
		expect(
			replaceString("Hello this is $name", "$name", "Max")
		).toBe(
			"Hello this is Max"
		)
	})

	test("should accept arrays for search and replace", (expect) => {
		expect(
			replaceString("Hello this is $name and I'm $age", ["$name", "$age"], ["Max", "22"])
		).toBe(
			"Hello this is Max and I'm 22"
		)
	})

	test("should throw an error if search and replace arrays are not balanced", (expect) => {
		expect(() => {
			replaceString("Hello this is $name and I'm $age", ["$name", "$age"], ["Max"])
		}).toThrowError(`'search' and 'replace' input parameters are not balanced.`)
	})

	test("should accept an object for the search parameter", (expect) => {
		expect(
			replaceString("Hello this is $name and I'm $age", {
				"$name": "Max",
				"$age": "22"
			})
		).toBe(
			"Hello this is Max and I'm 22"
		)
	})

	test("should throw an error if search is an object and replace is given", (expect) => {
		expect(() => {
			replaceString("Hello this is $name and I'm $age", {"$name": "Max", "$age": "22"}, [])
		}).toThrowError(`Cannot specify parameter 'replace' when 'search' is an object.`)
	})

})

export default suite
