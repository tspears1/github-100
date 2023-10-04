import { motion } from 'framer-motion'
import { useColumns } from '@context/columns'
import { useRepoData } from '@context/repo-data'
import { summarize, formatRank } from '@utils/formatters/card-formatter'
import '@types/typedef'

const Card = ({ content, index: sortIndex }) => {

    const { setSelectedId } = useRepoData()
    const { columns } = useColumns()

    /** @type {RepositoryData} */
    const { id, name, description, owner, stars, avatar, index: cardIndex } = content

    const ranking = formatRank(cardIndex)
    const summary = summarize(description)

    /**
     * Set the selected ID in context on click.
     *
     * @returns {void}
     */
    const handleClick = () => setSelectedId(id)

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
            className="card"
            variants={motionVariants}
            initial='hide'
            whileInView='show'
            exit='hide'
            transition={{
                delay: sortIndex % columns * 0.1,
                bounce: 0.85,
                type: 'spring',
                mass: 0.1,
                stiffness: 50
            }}
        >
            <div className="card__header">
                <div className="card__eyebrow">
                    <div className="card__eyebrow-icon material-symbols-rounded">star</div>
                    <div className="card__eyebrow-text">{ stars.toLocaleString() }</div>
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
                    <button
                        className="card__link"
                        onClick={ handleClick }
                    >
                        { name }
                    </button>
                </div>
                <div className="card__description">{ summary }</div>
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

export default Card