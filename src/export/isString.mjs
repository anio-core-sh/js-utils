export default function(value) {
	return Object.prototype.toString.call(value).toLowerCase() === "[object string]"
}
