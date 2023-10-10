// Components =========================================================
import Header from "@components/organisms/Header/Header.jsx"
import ContextProviders from "@components/organisms/ContextProviders/ContextProviders.jsx"
import CardGrid from "@components/organisms/CardGrid/CardGrid.jsx"
import FooterBar from "@components/organisms/FooterBar/FooterBar.jsx"

/**
 * @component App
 * @description The main component of the application.
 *
 * @returns {JSX.Element}
 */
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
