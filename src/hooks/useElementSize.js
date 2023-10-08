// React ========================================================================
import { useState, useEffect } from "react"

// Types ========================================================================
import '@types/typedef'

/**
 * Use ResizeObserver to get the size of an element.
 *
 * @param {React.RefObject} elementRef - A React ref created with useRef().
 * @returns {ElementSize} - The size of the element.
 */
const useElementSize = (elementRef) => {

    const [size, setSize] = useState({
        width: null,
        height: null,
    })

    useEffect(() => {

        /** @type {ResizeObserver} */
        const resizeObserver = new ResizeObserver(([ entry ]) => {
            /** @type {ElementSize} */
            const { width, height } = entry.contentRect
            setSize({ width, height })
        })

        resizeObserver.observe(elementRef.current)

        return () => {
            resizeObserver.disconnect()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return size
}

export { useElementSize }