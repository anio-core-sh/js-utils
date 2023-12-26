/**
 * Converts IPv4 string format `a.b.c.d` into uint32.
 */
export default function IPv4StringToUInt32(ip_str) {
	const octets = ip_str.split(".")
	let num = 0

	for (let i = 0; i < 4; ++i) {
		const octet = parseInt(octets[i], 10)
		const n_shift = (3 - i) * 8

		num |= (octet << n_shift)
	}

	return num >>> 0
}
