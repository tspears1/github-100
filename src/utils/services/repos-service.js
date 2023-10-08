// Libraries ================================================================
import { Octokit } from 'octokit'

// Utils ====================================================================
import { getAuthToken } from '@utils/services/auth-token-service.js'
import { formatRepoData } from '@utils/formatters/repo-formatter.js'

// Types ====================================================================
import '@types/typedef'

/**
 * Get the top starred repositories from GitHub and add them to a piece of state.
 *
 * @param {function} setter - The setter function to update the state.
 * @param {RepositorySearchParams} options
 * @returns {RepositoryData[]}
 */
const getRepos = ({
    q= 'stars:>1000',
    sort= 'stars',
    order= 'desc',
    per_page= 100,
    page= 1,
} = {}) => {

    // Get the GitHub personal access token.
    /** @type {string} */
    const token = getAuthToken()

    // Create the Octokit instance.
    const octokit = new Octokit({ auth: token })

    /**
     * Fetch the data from the GitHub API. Then filter it and store it.
     *
     * @return {Promise<RepositoryData[]>}
     */
    const fetchData = async () => {
        return await octokit.request('GET /search/repositories', {
            q,
            sort,
            order,
            per_page,
            page,
        }).then((response) => {
            return formatRepoData(response.data)
        }).catch((error) => {
            console.warn(error)
        })
    }
    return fetchData()
}

export { getRepos }