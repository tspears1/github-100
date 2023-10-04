// Components ===============================
import Card from '@components/molecules/card/Card'
import CardSkeleton from '@components/molecules/CardSkeleton/CardSkeleton'

// Context ===============================
import { useRepoData } from '@context/repo-data'

// Motion ===============================
import { AnimatePresence } from 'framer-motion'
import CardPanel from '../../molecules/CardPanel/CardPanel'

const CardGrid = () => {
    const { repos, selectedId } = useRepoData()

    // Build empty cards for skeleton loading.
    const skeletons = [...Array(19).keys()].map((index) => <CardSkeleton key={ index } index={ index }  />)

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