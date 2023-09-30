import { useEffect, useRef } from 'react'
import { Octokit } from 'octokit'
import { useAuthToken } from '../hooks/useAuthToken'

// https://api.github.com/search/commits?q=repo:freeCodeCamp/freeCodeCamp author-date:>2023-09-28&sort=author-date

/**
 * @typedef {Object} CommitSearchParams
 * @property {number} [deadline] - The number of minutes to search commits before. Default: 1440 (24 hours).
 * @property {'author-date' | 'committer-date'} [sort] - The sort field. One of author-date or committer-date. Default: results are sorted by best match.
 * @property {'asc' | 'desc'} [order] - The sort order if sort parameter is provided. One of asc or desc. Default: desc
 * @property {number} [per_page] - Results per page (max 100). Default: 30
 * @property {number} [page] - Page number of the results to fetch. Default: 1
 */

/**
 * @function useCommitSearch
 * @param {string} repoFullName - The name of the repository to search in the format owner/repo-name.
 * @param {CommitSearchParams} options
 * @returns {FilteredData[]}
 */
const useCommitSearch = (repoFullName,{
    deadline = 1440,
    sort= 'author-date',
    order= 'desc',
    per_page= 100,
    page= 1,
} = {}) => {

    // Data storage.
    const data = useRef(null)
    const token = useAuthToken()

    // Get the date string to search commits before based on the deadline.
    /** @type {string} dealineDate */
    let deadlineDate = new Date()
    deadlineDate.setMinutes(deadlineDate.getMinutes() - deadline)
    deadlineDate = deadlineDate.toISOString().split('T')[0]

    const filterData = (unfilteredData) => {
        console.log({ unfilteredData })
        return null
    }


    useEffect(() => {
        // Create a new instance of the Octokit REST API client.
        const octokit = new Octokit({ auth: token })
        const fetchData = async () => {
            // Fetch the data from the GitHub API.
            await octokit.request('GET /search/commits', {
                q: `repo:${repoFullName} author-date:>${deadlineDate}`,
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
    }, [])
}

export { useCommitSearch }