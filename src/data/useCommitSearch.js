import { useEffect, useRef } from 'react'
import { Octokit } from 'octokit'
import { useAuthToken } from '../hooks/useAuthToken'

/**
 * @typedef {Object} CommitSearchParams
 * @property {number} [deadline] - The number of minutes to search commits before. Default: 1440 (24 hours).
 * @property {'author-date' | 'committer-date'} [sort] - The sort field. One of author-date or committer-date. Default: results are sorted by best match.
 * @property {'asc' | 'desc'} [order] - The sort order if sort parameter is provided. One of asc or desc. Default: desc
 * @property {number} [per_page] - Results per page (max 100). Default: 30
 * @property {number} [page] - Page number of the results to fetch. Default: 1
 */

/**
 * @typedef {Object} CommitData
 * @property {string} url - The url of the commit.
 * @property {string} author - The login of the author of the commit.
 * @property {string} date - The date of the commit.
 * @property {string} message - The message of the commit.
 * @property {string} sha - The sha of the commit.
 */

/**
 * @function useCommitSearch
 * @param {string} repoFullName - The name of the repository to search in the format owner/repo-name.
 * @param {CommitSearchParams} options
 * @returns {CommitData[]}
 */
const useCommitSearch = (repoFullName,{
    deadline = 1440,
    sort= 'author-date',
    order= 'desc',
    per_page= 100,
    page= 1,
} = {}) => {

    const data = useRef(null)
    const token = useAuthToken()

    // Get the date string to search commits before based on the deadline.
    const _timestamp = new Date()
    _timestamp.setMinutes(_timestamp.getMinutes() - deadline)
    const deadlineTimestamp = _timestamp.toISOString()

    // Create the query string.
    const query = `repo:${repoFullName} author-date:>${deadlineTimestamp}`

    const filterData = (unfilteredData) => {
        const filtered = unfilteredData?.items.map((item) => {
            return {
                url: item.html_url,
                author: item.author.login,
                date: item.commit.author.date,
                message: item.commit.message,
                sha: item.sha,
            }
        })
        return data.current = filtered
    }

    useEffect(() => {
        // Create a new instance of the Octokit REST API client.
        const octokit = new Octokit({ auth: token })
        const fetchData = async () => {
            // Fetch the data from the GitHub API.
            await octokit.request('GET /search/commits', {
                q: query,
                sort,
                order,
                per_page,
                page,
            }).then((response) => {
                // Filter the data to only the fields we need.
                filterData(response.data)
            }).catch((error) => {
                console.warn(error)
            })
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, sort, order, per_page, page])

    return data
}

export { useCommitSearch }