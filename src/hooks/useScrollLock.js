import { useEffect, useState } from 'react'

/**
 * Use this hook toggle locking the scroll position of the body.
 *
 * @returns {function} - A function to lock the scroll position of the body.
 */
const useScrollLock = () => {
    const [locked, setLocked] = useState(false)

    useEffect(() => {
        if (locked) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = null
        }
    }, [locked])

    return setLocked
}

export { useScrollLock }