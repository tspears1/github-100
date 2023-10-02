import Header from "@components/organisms/header/Header"
import Layout from "@components/organisms/layout/Layout"
import Filters from "@components/organisms/filters/Filters"
import CardGrid from "@components/organisms/card-grid/CardGrid"

const App = () => {

  return (
    <>
      <Layout>
        <Header />
        <Filters />
        <CardGrid />
      </Layout>
    </>
  )
}

export default App
