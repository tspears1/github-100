import { RepoContextProvider } from "@context/repo-data"
import { ColumnsContextProvider } from "@context/columns"

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