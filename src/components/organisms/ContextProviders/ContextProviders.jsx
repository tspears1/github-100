// Context ===============================
import { ColumnsContextProvider } from "@context/columns"
import { RepoContextProvider } from "@context/repo-data"

/**
 * @component ContextProviders
 * @description A component for wrapping the app in context providers.
 *
 * @returns {JSX.Element}
 */
const ContextProviders = ({ children }) => {

    return (
        <RepoContextProvider>
            <ColumnsContextProvider>
                { children }
            </ColumnsContextProvider>
        </RepoContextProvider>
    )
}

export default ContextProviders