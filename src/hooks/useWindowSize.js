import { useLayoutEffect, useState } from 'react'

/**
 * Use window resize event to get the size of the window.
 *
 * @returns {ElementSize} - The size of the window.
 */
const useWindowSize = () => {
    const [size, setSize] = useState({
        width: null,
        height: null,
    })

    /**
     * Handle window resize event.
     *
     * @returns {void}
     */
    const handleResize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useLayoutEffect(() => {

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return size
}

export { useWindowSize }