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

/**
 * Repo data context provider.
 *
 * @param {Object} props
 * @param {Object} props.children - React children.
 * @returns {Object} RepoContext.Provider
 */
const RepoContextProvider = ({ children }) => {
    const [repos, setRepos] = useState([])
    const [commits, setCommits] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    useRepoSearch(setRepos)

    useEffect(() => {
        if (repos.length > 0) {
            const _commitData = repos.map(repo => {
                return {
                    id: repo.id,
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
            setCommits,
            selectedId,
            setSelectedId
        }}>
            {children}
        </RepoContext.Provider>
    )
}

export { RepoContextProvider, useRepoData }