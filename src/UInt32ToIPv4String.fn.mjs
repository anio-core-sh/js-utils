/**
 * Converts 32bit integer `num` to IPv4 string format `a.b.c.d`
 */
export default function UInt32ToIPv4String(num) {
	const binary_string = (num >>> 0).toString(2).padStart(32, "0")
	let octets = []

	for (let i = 0; i < 4; ++i) {
		const octet_slice = binary_string.slice(8 * i, 8 * (i + 1))
		const octet = parseInt(octet_slice, 2)

		octets.push(octet)
	}

	return octets.join(".")
}
