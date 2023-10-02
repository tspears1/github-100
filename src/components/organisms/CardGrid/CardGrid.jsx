// Components ===============================
import Card from '@components/molecules/card/Card'

// Context ===============================
import { useRepoData } from '@context/repo-data'

const CardGrid = () => {
    const data = useRepoData()

    const cards = data?.repos?.map((repo, index) => <Card content={ repo } key={ repo.id ?? index } />)

    return (
        <div className="card-grid">
            <ul className="card-grid__list">
                { data && cards }
            </ul>
        </div>
    )
}

export default CardGrid