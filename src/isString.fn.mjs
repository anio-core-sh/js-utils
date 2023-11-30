export default function isString(value) {
	return Object.prototype.toString.call(value).toLowerCase() === "[object string]"
}
