export default function arrayify(value) {
	if (Array.isArray(value)) return value

	return [value]
}
