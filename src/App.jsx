import Header from "@components/organisms/Header/Header.jsx"
import ContextProviders from "@components/organisms/ContextProviders/ContextProviders.jsx"
import CardGrid from "@components/organisms/CardGrid/CardGrid.jsx"
import FooterBar from "@components/organisms/FooterBar/FooterBar.jsx"

const App = () => {

  return (
    <ContextProviders>
      <Header />
      <CardGrid />
      <FooterBar />
    </ContextProviders>
  )
}

export default App
