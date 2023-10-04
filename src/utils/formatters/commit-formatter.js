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
            date: item.commit.author.date,
            message: item.commit.message,
            sha: item.sha,
        }
    })
    return filtered
}

export { formatCommitData }