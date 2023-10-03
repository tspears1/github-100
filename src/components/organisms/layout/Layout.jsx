import { RepoContextProvider } from "@context/repo-data"
import { ColumnsContextProvider } from "@context/columns"

const Layout = ({ children }) => {

    return (
        <RepoContextProvider>
            <ColumnsContextProvider>
                { children }
            </ColumnsContextProvider>
        </RepoContextProvider>
    )
}

export default Layout