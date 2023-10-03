// Components ===============================
import Card from '@components/molecules/card/Card'
import CardSkeleton from '@components/molecules/CardSkeleton/CardSkeleton'

// Context ===============================
import { useRepoData } from '@context/repo-data'

// Motion ===============================
import { AnimatePresence } from 'framer-motion'

const CardGrid = () => {
    const data = useRepoData()

    const skeletons = [...Array(19).keys()].map((index) => <CardSkeleton key={ index } index={ index }  />)

    const cards = data?.repos?.map((repo, index) => <Card content={ repo } key={ repo.id ?? index } index={ index } />)

    return (
        <div className="card-grid">
            <ul className="card-grid__list">
                    <AnimatePresence>
                        { !data.repos.length && skeletons }
                    </AnimatePresence>
                    <AnimatePresence>
                        { data.repos.length && cards }
                    </AnimatePresence>
            </ul>
        </div>
    )
}

export default CardGrid