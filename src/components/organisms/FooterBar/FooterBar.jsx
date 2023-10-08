// React ===============================
import { useEffect, useRef } from 'react'

// Hooks ===============================
import { useElementSize } from '@hooks/useElementSize.js'

// Context ===============================
import { useRepoDataContext } from '@context/repo-data'

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

    // Variables -------------------------------
    /** @type {string} */
    const loadingText = 'L O A D I N G . . .'

    // Refs -------------------------------
    /** @type {HTMLDivElement} */
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
                    <p className="footer-bar__text">
                        { !data?.repos?.length
                            ? loadingText
                            : `Showing ${data.repos?.length ?? 0} results`
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FooterBar