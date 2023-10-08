import { useRef, useEffect } from 'react'

/** @type {number} */
const KEYCODE_TAB = 9

/**
 * Default selector used for all focusable elements.
 * @type {array}
 */
const FOCUSABLE_SELECTOR = [
    'a[href]',
    'audio[controls]',
    'button',
    'details summary',
    'input',
    'map area[href]',
    'select',
    'svg a[xlink\\:href]',
    '[tabindex]',
    'textarea',
    'video[controls]',
].map(t => t + ':not([tabindex^="-"]):not([disabled])').join()

/**
 * Use this hook to trap focus within a given element.
 *
 * @returns {React.RefObject<HTMLDivElement>} A ref to the element to trap focus within.
 */
const useFocusTrap = () => {
    /** @type {React.RefObject<HTMLDivElement>} */
    const elRef = useRef(null)

    /**
     * Handle focus trap.
     * @param {KeyboardEvent} e
     *
     * @returns {void}
     */
    const handleFocus = (e) => {
        /** @type {NodeListOf<HTMLElement>} */
        const focusableEls = elRef.current.querySelectorAll(FOCUSABLE_SELECTOR)

        /** @type {HTMLElement} */
        const firstFocusableEl = focusableEls[0]

        /** @type {HTMLElement} */
        const lastFocusableEl = focusableEls[focusableEls.length - 1]

        /** @type {boolean} */
        const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB

        // If tab key is not pressed, do nothing
        if (!isTabPressed) { return }

        // If shift key is pressed, focus previous element, else focus next
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus()
                e.preventDefault()
            }
        }
    }

    useEffect(() => {
        /** @type {HTMLDivElement} */
        const el = elRef.current

        // Add event listener for keydown event
        el.addEventListener('keydown', handleFocus)

        return () => {
            // Remove event listener for keydown event on cleanup
            el.removeEventListener('keydown', handleFocus)
        }

    }, [])

    return elRef
}

export { useFocusTrap }