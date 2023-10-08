/**
 * Format card rank with leading zeros.
 *
 * @param {number} cardIndex
 * @returns {string}
 */
const formatRank = (cardIndex) => {
    // Adjust zero-based index to one-based rank.
    const rank = cardIndex >= 0 ? cardIndex + 1 : 0

    // Format rank with leading zeros.
    const ranking = rank < 10 ? `00${ rank }` : rank < 100 ? `0${ rank }` : rank

    return ranking
}


export { formatRank }
