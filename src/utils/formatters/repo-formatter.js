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
        /** @type {RepositoryData} */
        const data = {
            avatar: item?.owner.avatar_url ?? '',
            commits: null,
            description: item?.description ?? '',
            fullname: item?.full_name ?? '',
            id: item?.id ?? 0,
            index,
            name: item?.name ?? '',
            owner: item?.owner?.login ?? '',
            stars: item?.stargazers_count ?? 0,
            url: item?.html_url ?? '',
        }
        return data
    })
    return filtered
}

export { formatRepoData }