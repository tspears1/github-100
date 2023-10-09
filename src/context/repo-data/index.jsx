// React ===============================
import React, { useState, useEffect, createContext, useContext } from 'react'

// Utils ===============================
import { getCommits } from '@utils/services/commits-service.js'
import { getRepos } from '@utils/services/repos-service.js'

// Types ===============================
import '@types/typedef'

// Create context for repo data.
const RepoContext = createContext()

/**
 * Custom context hook for repo data.
 *
 * @returns {Object} repos, setRepos, selectedId, setSelectedId
 */
const useRepoDataContext = () => useContext(RepoContext)

/**
 * @component RepoContextProvider
 * @description Provide repo data to the app.
 * @param {React.Props} props
 *
 * @returns {JSX.Element}
 */
const RepoContextProvider = ({ children }) => {

    // State -----------------------------------------------
    const [repos, setRepos] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)

    // Effects ---------------------------------------------

    /**
     * Get repos on initial render.
     *
     * @returns {Promise<void>}
     */
    useEffect(() => {

        // If there are repos, return.
        if (repos.length) return

        // If there are no repos, get the repos.
        const fetchRepos = async () => {
            /** @type {RepositoryData[]} */
            const _repos = await getRepos()
            setRepos(_repos)
        }
        fetchRepos()

    }, [repos])

    /**
     * Get commits when a repo is selected.
     *
     * @returns {Promise<void>}
     */
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId])

    // Render ----------------------------------------------
    return(
        <RepoContext.Provider value={{
            repos,
            setRepos,
            selectedId,
            setSelectedId,
            selectedCard,
            setSelectedCard
        }}>
            {children}
        </RepoContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export { RepoContextProvider, useRepoDataContext }