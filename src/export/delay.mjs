export default function(amount) {
	return new Promise((resolve) => {
		setTimeout(resolve, amount)
	})
}
