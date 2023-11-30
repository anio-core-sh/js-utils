export default function isObject(value) {
	return Object.prototype.toString.call(value).toLowerCase() === "[object object]"
}
