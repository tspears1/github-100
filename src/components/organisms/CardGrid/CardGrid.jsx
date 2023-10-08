// React ===============================
import { useEffect } from 'react'

// Components ===============================
import Card from '@components/molecules/Card/Card.jsx'
import CardPanel from '@components/molecules/CardPanel/CardPanel.jsx'
import CardSkeleton from '@components/molecules/CardSkeleton/CardSkeleton.jsx'

// Context ===============================
import { useRepoDataContext } from '@context/repo-data'

// Hooks ===============================
import { useScrollLock } from '@hooks/useScrollLock.js'

// Motion ===============================
import { AnimatePresence } from 'framer-motion'

const CardGrid = () => {

    // Contexts -------------------------------
    // Get repos and selected ID from context.
    const { repos, selectedId } = useRepoDataContext()

    // Methods -------------------------------
    const setLocked = useScrollLock()

    // Effects -------------------------------
    useEffect(() => {
        // Lock scroll if no repos are present.
        !repos.length ? setLocked(true) : setLocked(false)

        // Clean up scroll lock on unmount.
        return () => setLocked(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repos])

    // Mapped Components -------------------------------
    // Build empty cards for skeleton loading.
    const skeletons = [...Array(19).keys()].map((index) => <CardSkeleton key={ index } index={ index }  />)

    // Build cards from repos.
    const cards = repos?.map((repo, index) => <Card content={ repo } key={ repo.id ?? index } index={ index } />)

    // Render -------------------------------
    return (
        <>
            <div className="card-grid">
                <ul className="card-grid__list">
                    <AnimatePresence>
                        { !repos.length && skeletons }
                        { repos.length && cards }
                    </AnimatePresence>
                </ul>
            </div>
            <AnimatePresence>
                { selectedId && <CardPanel selectedId={ selectedId } /> }
            </AnimatePresence>
        </>
    )
}

export default CardGrid