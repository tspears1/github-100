import { GithubIcon } from '@icons/Github'
import ThemeToggle from '@components/atoms/theme-toggle/ThemeToggle'
import './index.scss'

const Header = () => {

    return (
        <header className='site-header'>
            <div className='site-brand'>
                <div className='site-logo'>
                    <GithubIcon />
                </div>
                <h1 className='site-title'>GitHub<span>100</span></h1>
            </div>
            <nav className='site-utility'>
                <ul className='site-utility__list'>
                    <li className='site-utility__item'>
                        <a
                            href='https://github.com/tspears1/github-100'
                            className='site-utility__button button button--outline'
                            target='_blank'
                            title='View the Code'
                        >
                            <span className='sr-only'>View the Code</span>
                            <span className="icon material-symbols-rounded">data_object</span>
                        </a>
                    </li>
                    <li className='site-utility__item'>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header