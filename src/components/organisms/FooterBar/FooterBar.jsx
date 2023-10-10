// React ===============================
import { useEffect, useRef } from 'react'

// Components ===============================
import Loader from '@components/atoms/Loader/Loader'

// Hooks ===============================
import { useElementSize } from '@hooks/useElementSize.js'

// Context ===============================
import { useRepoDataContext } from '@context/repo-data'

// Motion ===============================
import { motion, AnimatePresence } from 'framer-motion'

// Types ===============================
import '@types/typedef'

/**
 * @component FooterBar
 * @description A component for displaying helper text at the bottom of the page.
 *
 * @returns {JSX.Element}
 */
const FooterBar = () => {
    // Contexts -------------------------------
    const data = useRepoDataContext()

    // Refs -------------------------------
    /** @type {React.RefObject<HTMLDivElement>} */
    const footerRef = useRef(null)

    // Setup -------------------------------
    // Get the height of the footer bar and set it as a CSS variable.
    const { height: footerHeight } = useElementSize(footerRef)

    useEffect(() => {

        if (!footerHeight) return
        document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`)

    }, [footerHeight])

    // Render -------------------------------
    return (
        <div className='footer-bar' ref={footerRef}>
            <div className="footer-bar__grid">
                <div className="footer-bar__content">
                    <div className="footer-bar__text">
                        <AnimatePresence>
                            { !data?.repos?.length && <Loader />}
                            { data?.repos?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                >
                                    {`Showing ${data.repos?.length ?? 0} results`}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterBar