import { motion } from 'framer-motion'

const motionVariants = {
    initial: {
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.5,
        }
    }
}

const CardSkeleton = ({ index }) => {
    return (
        <motion.article
            className="card"
            data-skeleton='true'
            style={{ '--card-index': index - 1 }}
            variants={motionVariants}
            initial='initial'
            animate='animate'
            exit='exit'
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