/**
 * Format description to 80 character summary with ellipsis.
 *
 * @param {string} description
 * @returns {string}
 */
const summarize = (text, length, ellipsis = false) => {
    if (text.length > length) {
        if (ellipsis) {
            return `${ text.substring(0, length) }...`
        }
        return text.substring(0, length)
    }
    return text
}

export { summarize }