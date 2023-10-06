// Components ===============================
import Card from '@components/molecules/Card/Card.jsx'
import CardSkeleton from '@components/molecules/CardSkeleton/CardSkeleton.jsx'
import CardPanel from '@components/molecules/CardPanel/CardPanel.jsx'

// Context ===============================
import { useRepoData } from '@context/repo-data'

// Motion ===============================
import { AnimatePresence } from 'framer-motion'

const CardGrid = () => {
    const { repos, selectedId } = useRepoData()

    // Build empty cards for skeleton loading.
    const skeletons = [...Array(12).keys()].map((index) => <CardSkeleton key={ index } index={ index }  />)

    // Build cards from repos.
    const cards = repos?.map((repo, index) => <Card content={ repo } key={ repo.id ?? index } index={ index } />)

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