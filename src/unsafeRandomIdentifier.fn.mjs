export default function unsafeRandomIdentifier(length) {
	let str = ``

	for (let i = 0; i < length; ++i) {
		let num = Math.floor(
			Math.random() * 255
		)

		str += num.toString(16).slice(0, 1)
	}

	return str
}
