import { useEffect, useRef } from 'react'
import { GithubIcon } from '@icons/Github.jsx'
import ThemeToggle from '@components/atoms/ThemeToggle/ThemeToggle.jsx'
// import Filters from '@components/organisms/Filters/Filters.jsx'
import { useElementSize } from '@hooks/useElementSize.js'
import { useRepoData } from '@context/repo-data'

const Header = () => {
    const { selectedId } = useRepoData()

    const headerRef = useRef(null)
    const { height: headerHeight } = useElementSize(headerRef)

    useEffect(() => {
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
    }, [headerHeight])

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
                        <li className='site-utility__item has--tooltip' inert={selectedId ? '' : null }>
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
                        <li className='site-utility__item has--tooltip' inert={selectedId ? '' : null }>
                            <ThemeToggle />
                            <tool-tip tip-position="block-end">Toggle Theme</tool-tip>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* <Filters /> */}
        </header>
    )
}

export default Header