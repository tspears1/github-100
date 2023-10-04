import { useState, useEffect, createContext, useContext } from 'react'
import { useRepoSearch } from '@hooks/useRepoSearch'
import { getCommits } from '@utils/getters/getCommits'

// Create context for repo data.
const RepoContext = createContext()

/**
 * Custom context hook for repo data.
 *
 * @returns {Object} repos, setRepos, selectedId, setSelectedId
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
    const [selectedId, setSelectedId] = useState(null)

    useRepoSearch(setRepos)

    useEffect(() => {
        // If there is no selectedId, return.
        // This is to prevent the useEffect from running on initial render or when null.
        if (!selectedId) return

        // Get the repo object from the repos array with the selected ID
        const _repo = repos.find(repo => repo.id === selectedId)

        // If the repo object is not found, return.
        if (!_repo) return

        // If the repo object has commits, return.
        if (_repo.commits?.length) return

        // If the repo object does not have any commits, get the commits.
        const fetchCommits = async () => {
            const _commits = await getCommits(_repo.fullname)
            setRepos(prevRepos => {
                prevRepos[_repo.index].commits = _commits
                return [...prevRepos]
            })
        }
        fetchCommits()

    }, [selectedId])

    return(
        <RepoContext.Provider value={{
            repos,
            setRepos,
            selectedId,
            setSelectedId
        }}>
            {children}
        </RepoContext.Provider>
    )
}

export { RepoContextProvider, useRepoData }