import '@types/typedef'

/**
 * Filter the commit search data to only the fields we need.
 *
 * @param {Object} unfilteredData - The unfiltered data from the GitHub API.
 * @return {RepositoryData[]}
 */
const formatRepoData = (unfilteredData) => {
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
    return filtered
}

export { formatRepoData }