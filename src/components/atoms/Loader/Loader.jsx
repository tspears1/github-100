import { motion, useReducedMotion } from 'framer-motion'

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

    // Motion -------------------------------
    const shouldReduceMotion = useReducedMotion()

    /** @type {number} */
    const baseY = shouldReduceMotion ? 0 : -10

    /** @type {number[]} */
    const animateY = shouldReduceMotion ? [0, 0, 0] : [0, -10, 0]

    // Render -------------------------------
    return (
        <div className="loader">
            { loadingText.split('').map((letter, index) => (
                <motion.span
                    key={index}
                    className="loader__letter"
                    initial={{
                        opacity: 0,
                        y: baseY,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: animateY,
                    }}
                    exit={{
                        opacity: 0,
                        y: baseY,
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