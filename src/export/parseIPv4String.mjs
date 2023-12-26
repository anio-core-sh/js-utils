function createSubnetMask(n) {
	n = parseInt(n, 10)

	const ones = "1".repeat(n)
	const zeros = "0".repeat(32 - n)

	return parseInt(`${ones}${zeros}`, 2) >>> 0
}

function invertSubnetMask(n) {
	return (n ^ 0xFFFFFFFF) >>> 0
}

function mask(ip, mask) {
	return (ip & mask) >>> 0
}

export default function parseIPv4String(ip_str) {
	const tmp = ip_str.split("/")

	if (tmp.length > 2) {
		throw new Error(`Invalid IPv4 string '${ip_str}'.`)
	} else if (tmp.length === 1) {
		return parseIPv4String(`${ip_str}/32`)
	}

	const submask = createSubnetMask(tmp[1])
	const host = mask(
		IPv4StringToUInt32(tmp[0]), invertSubnetMask(submask)
	)
	const network = mask(
		IPv4StringToUInt32(tmp[0]), submask
	)

	return {network, host, submask}
}
