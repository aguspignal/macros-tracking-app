export function isOlderThanTwoWeeks(dateStr: string) {
	const date = new Date(dateStr)
	const twoWeeksAgo = new Date()
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
	return date < twoWeeksAgo
}
