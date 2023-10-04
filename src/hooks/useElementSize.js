import { useState, useEffect } from "react"

/**
 * @typedef {Object} ElementSize
 * @property {number} width - The width of the element.
 * @property {number} height - The height of the element.
 */

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
        const resizeObserver = new ResizeObserver(([ entry ]) => {
            const { width, height } = entry.contentRect
            setSize({ width, height })
        })

        resizeObserver.observe(elementRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return size
}

export { useElementSize }