import '@types/typedef'

/**
 * Filter the commit search data to only the fields we need.
 *
 * @param {Object} unfilteredData - The unfiltered data from the GitHub API.
 * @return {CommitData[]}
 */
const formatCommitData = (unfilteredData) => {
    const filtered = unfilteredData?.items.map((item) => {
        return {
            url: item.html_url,
            author: item.author.login,
            avatar: item.author.avatar_url,
            date: item.commit.author.date,
            message: item.commit.message,
            sha: item.sha,
            hours: formatCommitDate(item.commit.author.date),
            shortSha: formatCommitSha(item.sha)
        }
    })
    return filtered
}

/**
 * Format the sha of the commit to show only the first 7 characters.
 *
 * @param {string} sha - The sha of the commit.
 * @return {string}
 */
const formatCommitSha = (sha) => sha.substring(0, 7)

/**
 * Format the date of the commit to show how many hours/minutes ago it was committed.
 *
 * @param {string} date - The date of the commit.
 * @return {string}
 */
const formatCommitDate = (date) => {
    const commitDate = new Date(date)
    const currentDate = new Date()
    const diff = currentDate - commitDate
    const hours = Math.floor(diff / 1000 / 60 / 60)
    // if less than 1 hour, return minutes
    if (hours < 1) {
        const minutes = Math.floor(diff / 1000 / 60)
        return `${minutes} minutes ago`
    }
    return `${hours} hours ago`
}

export { formatCommitData, formatCommitDate, formatCommitSha }
