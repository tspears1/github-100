import Header from "@components/organisms/Header/Header"
import ContextProviders from "@components/organisms/ContextProviders/ContextProviders"
import CardGrid from "@components/organisms/CardGrid/CardGrid"
import FooterBar from "@components/organisms/FooterBar/FooterBar"

const App = () => {

  return (
    <>
      <ContextProviders>
        <Header />
        <CardGrid />
        <FooterBar />
      </ContextProviders>
    </>
  )
}

export default App
