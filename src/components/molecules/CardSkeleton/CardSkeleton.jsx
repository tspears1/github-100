import { motion } from 'framer-motion'
import { useColumns } from '@context/columns'

const motionVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 0.6,
    },
    exit: {
        opacity: 0,
        y: 20,
    }
}

const CardSkeleton = ({ index }) => {

    // Get number of columns from context.
    const { columns } = useColumns()

    return (
        <motion.article
            className="card"
            data-skeleton='true'
            style={{ '--card-index': index - 1 }}
            variants={motionVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
                delay: index % columns * 0.05,
                bounce: 0.85,
                type: 'spring',
                mass: 0.1,
                stiffness: 70
            }}
        >
            <div className="card__header">
                <div className="card__eyebrow">

                    <div className="card__eyebrow-text"/>
                </div>
                <div className="card__avatar" />
            </div>
            <div className="card__body">
                <div className="card__author" />
                <div className="card__title" />
                <div className="card__description"/>
                <div className="card__description"/>
            </div>

            <div className="card__footer">
                <div className="card__ranking-hold"/>
                <div className="card__button" />
            </div>
        </motion.article>
    )
}

export default CardSkeleton