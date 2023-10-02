import { RepoDataContext } from "@context/repo-data"

const Layout = ({ children }) => {

    return (
        <RepoDataContext>
            { children }
        </RepoDataContext>
    )
}

export default Layout