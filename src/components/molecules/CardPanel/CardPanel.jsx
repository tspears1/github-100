import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRepoData } from '@context/repo-data'
import { formatRank } from '@utils/formatters/card-formatter'
import '@types/typedef'

const CardPanel = ({ selectedId }) => {

    const { repos, setSelectedId } = useRepoData()
    const [ currentRepo, setCurrentRepo ] = useState(null)

    useEffect(() => {
        if (selectedId) {
            const _currentRepo = repos.find(repo => repo.id === selectedId)
            setCurrentRepo(_currentRepo)
        }
    }, [selectedId])

    /** @type {RepositoryData} */
    const { name, description, owner, stars, avatar, index, commits } = currentRepo || {}

    const ranking = formatRank(index)

    /** @type {AnimationProps.variants} */
    const motionVariants = {
        show: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        hide: {
            opacity: 0,
            y: 100,
            scale: 0.8
        }
    }

    return (
        <motion.article
            className="card card-panel"
            variants={motionVariants}
            initial='hide'
            whileInView='show'
            exit='hide'
        >
            <div className="card__header">
                <div className="card__eyebrow">
                    <div className="card__eyebrow-icon material-symbols-rounded">star</div>
                    <div className="card__eyebrow-text">{ stars?.toLocaleString() }</div>
                </div>
                <div className="card__avatar">
                    <img className="lazyload" src={ avatar } alt={ owner } />
                </div>
            </div>
            <div className="card__body">
                <div className="card__author">
                    { owner }
                </div>
                <div className="card__title">
                    <button className="card__link" onClick={() => setSelectedId(null)}>
                        { name }
                    </button>
                </div>
                <div>Commits: { commits?.length ?? 'n/a' }</div>
                <div className="card__description">{ description }</div>
            </div>

            <div className="card__footer">
                <div className="card__ranking">
                    { ranking }
                </div>
                <div className="card__button button button--outline" title="View Repo Details">
                    <span className="sr-only">View Repo Details</span>
                    <span className="card__button-icon material-symbols-rounded">add</span>
                </div>
            </div>
        </motion.article>
    )
}

export default CardPanel