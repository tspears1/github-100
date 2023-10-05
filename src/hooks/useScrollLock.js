import { useEffect } from 'react'

/**
 * Use this hook to lock the scroll position of the body when the component mounts.
 *
 * @returns {void}
 */
const useScrollLock = () => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow
        document.body.style.overflow = 'hidden'
        return () => (document.body.style.overflow = originalStyle)
    }, [])
}

export { useScrollLock }