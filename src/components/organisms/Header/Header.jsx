// React ===============================
import { useEffect, useRef } from 'react'

// Components ===============================
import ThemeToggle from '@components/atoms/ThemeToggle/ThemeToggle.jsx'

// Context ===============================
import { useRepoDataContext } from '@context/repo-data'

// Hooks ===============================
import { useElementSize } from '@hooks/useElementSize.js'

// Assets ===============================
import { GithubIcon } from '@icons/Github.jsx'

// Types ===============================
import '@types/typedef'

/**
 * @component Header
 * @description A component for displaying the site header.
 *
 * @returns {JSX.Element}
 */
const Header = () => {
    // Contexts -------------------------------
    const { selectedId } = useRepoDataContext()

    // Refs -------------------------------
    /** @type {HTMLDivElement} */
    const headerRef = useRef(null)

    // Setup -------------------------------
    // Get the height of the header and set it as a CSS variable.
    const { height: headerHeight } = useElementSize(headerRef)

    useEffect(() => {
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
    }, [headerHeight])

    // Render -------------------------------
    return (
        <header className='site-header' ref={headerRef}>
            <div className="site-header__grid">
                <div className='site-header__brand'>
                    <div className='site-header__logo'>
                        <GithubIcon />
                    </div>
                    <h1 className='site-header__title'>GitHub<span>100</span></h1>
                </div>
                <nav className='site-utility'>
                    <ul className='site-utility__list'>
                        <li
                            className='site-utility__item has--tooltip'
                            inert={selectedId ? '' : null}
                        >
                            <a
                                href='https://github.com/tspears1/github-100'
                                className='site-utility__button button button--outline'
                                target='_blank'
                                title='View the Source'
                            >
                                <span className='sr-only'>View the Source</span>
                                <span className="icon material-symbols-rounded">data_object</span>
                            </a>
                            <tool-tip tip-position="block-end">View the Source</tool-tip>
                        </li>
                        <li
                            className='site-utility__item has--tooltip'
                            inert={selectedId ? '' : null}
                        >
                            <ThemeToggle />
                            <tool-tip tip-position="block-end">Toggle Theme</tool-tip>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header