export default {
	type: "lib",

	language: "js",

	deployment: {
		to: "npmjs.com",

		config: {
			provenance: true
		}
	},

	test: {
		input: ["/__tests__/"]
	}
}
