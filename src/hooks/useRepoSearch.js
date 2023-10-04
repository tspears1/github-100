import { useEffect, useRef } from 'react'
import { Octokit } from 'octokit'
import { useAuthToken } from '../hooks/useAuthToken'
import '@types/typedef'

/**
 * Get the top starred repositories from GitHub and add them to a piece of state.
 *
 * @param {function} setter - The setter function to update the state.
 * @param {RepositorySearchParams} options
 * @returns {RepositoryData[]}
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
     * @return {RepositoryData[]}
     */
    const filterData = (unfilteredData) => {
        if (!unfilteredData) return

        const filtered = unfilteredData?.items.map((item, index) => {
            return {
                index,
                id: item.id,
                name: item.name,
                owner: item.owner.login,
                stars: item.stargazers_count,
                url: item.html_url,
                topics: item.topics,
                description: item.description,
                avatar: item.owner.avatar_url,
                fullname: item.full_name,
                commits: null,
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
         * @return {Promise<RepositoryData[]>}
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