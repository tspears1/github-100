import { useState, useEffect, createContext, useContext } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'

/**
 * @typedef {Object} ColumnBreakpoint
 * @property {number} min - Minimum window width.
 * @property {number} max - Maximum window width.
 * @property {number} columns - Number of columns.
 */

/**
 * Column breakpoints.
 *
 * @type {ColumnBreakpoint[]}
 */
const columnBreakpoints = [
    { min: 0, max: 799, columns: 1 },
    { min: 800, max: 1199, columns: 2 },
    { min: 1200, max: 1759, columns: 3 },
    { min: 1760, max: 2239, columns: 4 },
    { min: 2240, max: 9999, columns: 5 }
]

// Create context for columns.
const ColumnsContext = createContext()

/**
 * Custom context hook for columns.
 *
 * @returns {Object} columns, setColumns
 */
const useColumns = () => useContext(ColumnsContext)

/**
 * Columns context provider.
 * Set the number of card columns that fit in the current window.
 *
 * @param {Object} props
 * @param {Object} props.children - React children.
 * @returns {Object} ColumnsContext.Provider
 */
const ColumnsContextProvider = ({ children }) => {
    const [columns, setColumns] = useState(1)
    const currentWindow = useWindowSize()

    useEffect(() => {
        const updateColumns = () => {
            const breakpoint = columnBreakpoints.filter((breakpoint) => currentWindow.width > breakpoint.min && currentWindow.width < breakpoint.max)
            setColumns(breakpoint[0]?.columns ?? 1)
        }
        updateColumns()
    }, [currentWindow.width])

    return(
        <ColumnsContext.Provider value={{
            columns,
            setColumns
        }}>
            {children}
        </ColumnsContext.Provider>
    )
}

export { ColumnsContextProvider, useColumns }