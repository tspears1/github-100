
/**
 * Format description to 80 character summary with ellipsis.
 *
 * @param {string} description
 * @returns {string}
 */
const summarize = (description) => description.length > 80 ? `${ description.substring(0, 80) }...` : description


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


export { summarize, formatRank }
