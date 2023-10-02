import { useEffect, useRef } from 'react'

const ThemeToggle = () => {
    /** @type {string} */
    const storageKey = 'theme-preference'

    /** @type {'light' | 'dark'} */
    const theme = useRef('light')

    /**
     * Toggle current theme value and update preference
     *
     * @returns {void}
     */
    const handleClick = () => {
        theme.current = theme.current === 'light' ? 'dark' : 'light'

        setPreference()
    }

    /**
     * Get the current color preference
     *
     * @returns {'light' | 'dark'}
     */
    const getColorPreference = () => {
        if (localStorage.getItem(storageKey)) {
            return localStorage.getItem(storageKey)
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
    }

    /**
     * Set the current color preference
     *
     * @returns {void}
     */
    const setPreference = () => {
        localStorage.setItem(storageKey, theme.current)
        reflectPreference()
    }

    /**
     * Update the root element with the current theme
     *
     * @returns {void}
     */
    const reflectPreference = () => {
        document.documentElement.setAttribute('color-scheme', theme.current)
    }

    useEffect(() => {
        // set initial value
        theme.current = getColorPreference()

        // set early so no page flashes / CSS is made aware
        reflectPreference()

        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', ({ matches: isDark }) => {
                theme.current = isDark ? 'dark' : 'light'
                setPreference()
            })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <button
            className='theme-toggle button button--outline'
            id='theme-toggle'
            title='Toggles light & dark'
            aria-label={ theme.current ?? 'auto' }
            aria-live='polite'
            onClick={ handleClick }
        >
            <svg className='sun-and-moon' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24'>
                <mask className='moon' id='moon-mask'>
                    <rect x='0' y='0' width='100%' height='100%' fill='white' />
                    <circle cx='24' cy='10' r='6' fill='black' />
                </mask>
                <circle className='sun' cx='12' cy='12' r='6' mask='url(#moon-mask)' fill='currentColor' />
                <g className='sun-beams' stroke='currentColor'>
                    <line x1='12' y1='1' x2='12' y2='3' />
                    <line x1='12' y1='21' x2='12' y2='23' />
                    <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
                    <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
                    <line x1='1' y1='12' x2='3' y2='12' />
                    <line x1='21' y1='12' x2='23' y2='12' />
                    <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
                    <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
                </g>
            </svg>
        </button>
    )
}

export default ThemeToggle