import { motion } from 'framer-motion'
import { useColumns } from '@context/columns'

const Card = ({ content, index }) => {
    // Destructure content object.
    const { name, description, owner, stars, avatar, rank } = content

    // Cut description to 80 characters and add ellipsis.
    const summary = description.length > 80 ? `${ description.substring(0, 80) }...` : description

    // Formatted rank with leading zeros.
    const ranking = rank < 10 ? `00${ rank }` : rank < 100 ? `0${ rank }` : rank

    // Get number of columns from context.
    const { columns } = useColumns()

    return (
        <motion.article
            className="card"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
                delay: index % columns * 0.1,
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
                    <button className="card__link">
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