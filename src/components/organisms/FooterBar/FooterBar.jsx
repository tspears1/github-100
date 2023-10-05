import { useEffect, useRef } from 'react'
import { useElementSize } from '@hooks/useElementSize.js'

// Context ===============================
import { useRepoData } from '@context/repo-data'
import { motion, AnimatePresence } from 'framer-motion'

const FooterBar = () => {
    const data = useRepoData()

    const footerRef = useRef(null)
    const { height: footerHeight } = useElementSize(footerRef)

    useEffect(() => {
        document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`)
    }, [footerHeight])

    return (
        <div className='footer-bar' ref={footerRef}>
            <div className="footer-bar__grid">
                <AnimatePresence>
                    { !data?.repos?.length &&
                        <motion.div
                            className="footer-bar__content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="footer-bar__text">L O A D I N G . . .</p>
                        </motion.div>
                    }
                    { data?.repos?.length &&
                        <motion.div
                            className="footer-bar__content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="footer-bar__text">Showing { data?.repos?.length } results</p>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FooterBar