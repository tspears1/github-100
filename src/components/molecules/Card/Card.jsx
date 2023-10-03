import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'

const columnBreakpoints = [
    { min: 0, max: 799, columns: 1 },
    { min: 800, max: 1199, columns: 2 },
    { min: 1200, max: 1759, columns: 3 },
    { min: 1760, max: 2239, columns: 4 },
    { min: 2240, max: 9999, columns: 5 }
]

const Card = ({ content, index }) => {
    const { name, description, owner, stars, avatar, rank } = content

    // cut description to 150 characters and add ellipsis
    const summary = description.length > 80 ? `${ description.substring(0, 80) }...` : description

    // formatted rank with leading zeros
    const ranking = rank < 10 ? `00${ rank }` : rank < 100 ? `0${ rank }` : rank

    const [columns, setColumns] = useState(1)
    const currentWindow = useWindowSize()

    // TODO: Move to context
    useEffect(() => {
        const updateColumns = () => {
            const breakpoint = columnBreakpoints.filter((breakpoint) => currentWindow.width > breakpoint.min && currentWindow.width < breakpoint.max)
            setColumns(breakpoint[0].columns)
        }
        updateColumns()
    }, [currentWindow.width])

    return (
        <motion.article
            className="card"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ delay: index % columns * 0.1, bounce: 0.85, type: 'spring', mass: 0.1, stiffness: 50 }}
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