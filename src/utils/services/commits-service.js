// Libraries ================================================================
import { Octokit } from 'octokit'

// Utils ====================================================================
import { getAuthToken } from '@utils/services/auth-token-service'
import { formatCommitData } from '@utils/formatters/commit-formatter'

// Types ====================================================================
import '@types/typedef'

/**
 * Get the most recent commits for a repository.
 *
 * @param {string} repoFullName - The name of the repository to search in the format owner/repo-name.
 * @param {CommitSearchParams} options
 * @returns {CommitData[]}
 */
const getCommits = (repoFullName, {
    deadline = 1440,
    sort = 'author-date',
    order = 'desc',
    per_page = 100,
    page = 1,
} = {}) => {

    // If there is no repoFullName, return.
    if (!repoFullName) return

    // Get the GitHub personal access token.
    /** @type {string} */
    const token = getAuthToken()

    /**
     * Get the date string to search commits before based on the deadline.
     * @param {number} deadline  The number of minutes to search commits before.
     *
     * @return {string}
     */
    const getDeadlineDate = (deadline) => {
        /** @type {Date} */
        const _timestamp = new Date()
        _timestamp.setMinutes(_timestamp.getMinutes() - deadline)

        return _timestamp.toISOString()
    }

    const deadlineTimestamp = getDeadlineDate(deadline)

    // Create the query string.
    const query = `repo:${repoFullName} author-date:>${deadlineTimestamp}`

    // Create the Octokit instance.
    const octokit = new Octokit({ auth: token })

    /**
     * Fetch the data from the GitHub API. Then filter it and store it.
     *
     * @return {Promise<CommitData[]>}
     */
    const fetchData = async () => {
        return await octokit.request('GET /search/commits', {
            q: query,
            sort,
            order,
            per_page,
            page,
        }).then((response) => {
            return formatCommitData(response.data)
        }).catch((error) => {
            console.warn(error)
        })
    }
    return fetchData()
}

export { getCommits }
