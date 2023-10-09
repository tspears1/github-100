import { motion } from 'framer-motion'

/**
 * @component Loader
 * @description A component for displaying an animated loading indicator.
 *
 * @returns {JSX.Element}
 */
const Loader = () => {
    // Variables -------------------------------
    /** @type {string} */
    const loadingText = 'LOADING'

    // Render -------------------------------
    return (
        <div className="loader">
            { loadingText.split('').map((letter, index) => (
                <motion.span
                    key={index}
                    className="loader__letter"
                    initial={{
                        opacity: 0,
                        y: -10
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: [0, -10, 0]
                    }}
                    exit={{
                        opacity: 0,
                        y: -10,
                        transition: {
                            duration: 2.5
                        }
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: index * 0.1
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    )
}

export default Loader