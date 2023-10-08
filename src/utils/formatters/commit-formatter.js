// Utils =================================================================
import { summarize } from '@utils/formatters/summarize.js'

// Types =================================================================
import '@types/typedef'

/**
 * Format the date of the commit to show how many hours/minutes ago it was committed.
 *
 * @param {string} date - The date of the commit.
 * @return {string}
 */
const formatCommitDate = (date) => {
    if (!date) return
    const commitDate = new Date(date)
    const currentDate = new Date()
    const diff = currentDate - commitDate
    const hours = Math.floor(diff / 1000 / 60 / 60)
    // if less than 1 hour, return minutes
    if (hours < 1) {
        let minutes = Math.floor(diff / 1000 / 60)
        if (minutes < 1) {
            return 'just now'
        }
        return `${minutes} minutes ago`
    }
    return `${hours} hours ago`
}

/**
 * Filter the commit search data to only the fields we need.
 *
 * @param {Object} unfilteredData - The unfiltered data from the GitHub API.
 * @return {CommitData[]}
 */
const formatCommitData = (unfilteredData) => {
    const filtered = unfilteredData?.items.map((item) => {
        return {
            author: item?.author?.login ?? 'unknown',
            avatar: item?.author?.avatar_url ?? null,
            date: item?.commit?.author?.date ?? null,
            hours: formatCommitDate(item?.commit?.author?.date),
            message: summarize(item?.commit?.message, 270, true) ?? '',
            sha: item?.sha ?? '',
            shortSha: summarize(item?.sha, 7),
            url: item.html_url ?? '',
        }
    })
    return filtered
}

export { formatCommitData, formatCommitDate }
