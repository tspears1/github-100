import { useEffect, useRef } from 'react'
import { Octokit } from 'octokit'
import { useAuthToken } from '../hooks/useAuthToken'

/**
 * @typedef {Object} RepositorySearchParams
 * @property {string} [q] - The search keywords, as well as any qualifiers.
 * @property {'stars' | 'forks' | 'help-wanted-issues' | 'updated'} [sort] - The sort field. One of stars, forks, or updated. Default: results are sorted by best match.
 * @property {'asc' | 'desc'} [order] - The sort order if sort parameter is provided. One of asc or desc. Default: desc
 * @property {number} [per_page] - Results per page (max 100). Default: 30
 * @property {number} [page] - Page number of the results to fetch. Default: 1
 */

/**
 * @typedef {Object} FilteredData
 * @property {number} id - The id of the repository.
 * @property {string} name - The name of the repository.
 * @property {string} owner - The login of the owner of the repository.
 * @property {number} stars - The number of stars of the repository.
 * @property {string} url - The url of the repository.
 * @property {string[]} topics - The topics of the repository.
 * @property {string} description - The description of the repository.
 * @property {string} avatar - The avatar url of the owner of the repository.
 * @property {string} fullname - The full name of the repository in the format of owner/name.
 * @property {number} rank - The rank of the repository.
 */

/**
 * Get the top starred repositories from GitHub and add them to a piece of state.
 *
 * @param {function} setter - The setter function to update the state.
 * @param {RepositorySearchParams} options
 * @returns {FilteredData[]}
 */
const useRepoSearch = (setter, {
    q= 'stars:>1000',
    sort= 'stars',
    order= 'desc',
    per_page= 100,
    page= 1,
} = {}) => {

    // Data storage.
    const data = useRef([])
    const token = useAuthToken()

    /**
     * Filter the data to only the fields we need.
     *
     * @param {Object} unfilteredData - The unfiltered data from the GitHub API.
     * @return {FilteredData[]}
     */
    const filterData = (unfilteredData) => {
        if (!unfilteredData) return

        const filtered = unfilteredData?.items.map((item, index) => {
            return {
                id: item.id,
                name: item.name,
                owner: item.owner.login,
                stars: item.stargazers_count,
                url: item.html_url,
                topics: item.topics,
                description: item.description,
                avatar: item.owner.avatar_url,
                fullname: item.full_name,
                rank: index + 1
            }
        })
        setter(filtered)
        return data.current = filtered
    }

    useEffect(() => {
        const octokit = new Octokit({ auth: token })

        /**
         * Fetch the data from the GitHub API. Then filter it and store it.
         *
         * @return {Promise<FilteredData[]>}
         */
        const fetchData = async () => {
            await octokit.request('GET /search/repositories', {
                q,
                sort,
                order,
                per_page,
                page
            }).then((response) => {
                filterData(response.data)
            }).catch((error) => {
                console.warn(error)
            })
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return data
}

export { useRepoSearch }