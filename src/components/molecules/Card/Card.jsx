// React ===============================
import { useState, useEffect } from 'react'

// Context ===============================
import { useRepoDataContext } from '@context/repo-data'
import { useColumnsContext } from '@context/columns'

// Motion ===============================
import { motion, useInView, useAnimate, useReducedMotion } from 'framer-motion'

// Utils ===============================
import { formatRank } from '@utils/formatters/card-formatter.js'
import { summarize } from '@utils/formatters/summarize.js'

// Types ===============================
import '@types/typedef'

/**
 * @component Card
 * @description A card component for displaying repository data.
 * @param {CardProps} props
 *
 * @returns {JSX.Element}
 */
const Card = ({ content, index: sortIndex }) => {

    // Props -------------------------------
    const { id, name, description, owner, stars, avatar, index: cardIndex } = content

    // States -------------------------------
    const [locked, setLocked] = useState(false)

    // Contexts -------------------------------
    const { selectedId, setSelectedId, setSelectedCard } = useRepoDataContext()
    const { columns } = useColumnsContext()

    // Formatters -------------------------------
    const ranking = formatRank(cardIndex)
    const summary = summarize(description, 80, true)

    // Handlers -------------------------------

    /**
     * Set the selected ID and Card Element in context on click.
     * @param {React.MouseEvent}
     *
     * @returns {void}
     */
    const handleClick = (e) => {
        setSelectedId(id)
        setSelectedCard(e.currentTarget)
    }

    // Motion -------------------------------
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    // Check reduced motion settings.
    const shouldReduceMotion = useReducedMotion()

    /** @type {number} */
    const lockedScale = shouldReduceMotion ? 1 : 0.9

    useEffect(() => {
        if (!isInView) return

        if (selectedId) {
            setLocked(true)
            animate(scope.current, { opacity: 0.2, y: 0, scale: lockedScale }, {duration: 0.5, ease: 'anticipate' })
        } else {
            animate(scope.current, { opacity: 1, y: 0, scale: 1 }, {duration: 0.5, ease: 'anticipate' })
            setLocked(false)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId])

    /** @type {number} */
    const hideOpacity = shouldReduceMotion ? 1 : 0

    /** @type {number} */
    const hideScale = shouldReduceMotion ? 1 : 0.8

    /** @type {number} */
    const hideY = shouldReduceMotion ? 0 : 100

    /** @type {number} */
    const transitionDelay = shouldReduceMotion ? 0 : sortIndex % columns * 0.1

    /** @type {AnimationProps.variants} */
    const motionVariants = {
        show: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        hide: {
            opacity: hideOpacity,
            y: hideY,
            scale: hideScale,
        }
    }

    // Render -------------------------------
    return (
        <motion.article
            className="card"
            ref={scope}
            variants={motionVariants}
            initial='hide'
            whileInView='show'
            exit='hide'
            transition={{
                delay: transitionDelay,
                bounce: 0.85,
                type: 'spring',
                mass: 0.1,
                stiffness: 50
            }}
            inert={locked ? '' : null }
            role="listitem"
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
                <h3 className="card__title">
                    <button
                        className="card__link"
                        onClick={ handleClick }
                    >
                        { name }
                    </button>
                </h3>
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