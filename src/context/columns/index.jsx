// React ===============================
import React, { useState, useEffect, createContext, useContext } from 'react'

// Hooks ===============================
import { useWindowSize } from '@hooks/useWindowSize.js'

// Types ===============================
import '@types/typedef'

// Create context for columns.
const ColumnsContext = createContext()

/**
 * Custom context hook for columns.
 *
 * @returns {Object} columns, setColumns
 */
const useColumnsContext = () => useContext(ColumnsContext)

/**
 * @component ColumnsContextProvider.
 * @descirption Set the number of card columns that fit in the current window.
 * @param {React.Props} props
 *
 * @returns {JSX.Element}
 */
const ColumnsContextProvider = ({ children }) => {
    const [columns, setColumns] = useState(1)
    const currentWindow = useWindowSize()

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

    /**
     * Get the current breakpoint.
     *
     * @param {ColumnBreakpoint[]} breakpoints - Array of breakpoints.
     *
     * @returns {ColumnBreakpoint} - The current breakpoint.
     */
    const getBreakpoint = (breakpoints) => {
        // Find the breakpoint that matches the current window width.
        return breakpoints.filter((breakpoint) => currentWindow.width > breakpoint.min && currentWindow.width < breakpoint.max)
    }

    // Effects ---------------------------------------------
    useEffect(() => {

        // Find the breakpoint that matches the current window width.
        const breakpoint = getBreakpoint(columnBreakpoints)

        // Set the number of columns.
        setColumns(breakpoint[0]?.columns ?? 1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWindow.width])

    // Render ----------------------------------------------
    return(
        <ColumnsContext.Provider value={{
            columns,
            setColumns
        }}>
            {children}
        </ColumnsContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export { ColumnsContextProvider, useColumnsContext }