import { useState, useEffect, createContext, useContext } from 'react'
import { useRepoSearch } from '@hooks/useRepoSearch'

// Create context for repo data.
const RepoContext = createContext()

/**
 * Custom context hook for repo data.
 *
 * @returns {Object} repos, setRepos, commits, setCommits
 */
const useRepoData = () => useContext(RepoContext)

const RepoDataContext = ({ children }) => {
    const [repos, setRepos] = useState([])
    const [commits, setCommits] = useState([])

    useRepoSearch(setRepos)

    useEffect(() => {
        if (repos.length > 0) {
            const _commitData = repos.map(repo => {
                return {
                    name: repo.fullname,
                    commits: []
                }
            })
            setCommits(_commitData)
        }
    }, [repos])

    return(
        <RepoContext.Provider value={{
            repos,
            setRepos,
            commits,
            setCommits
        }}>
            {children}
        </RepoContext.Provider>
    )
}

export { RepoDataContext, useRepoData }