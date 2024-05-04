import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Search from "./components/Search"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WeatherPage from "./components/WeatherPage"
import { useState } from "react"

function App() {
  const [position, setPosition] = useState(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search setPosition={setPosition} />} />
          {/* <Route path="/weather/:latitude/:longitude" element={<WeatherPage />} /> */}
          <Route path="/weather" element={<WeatherPage position={position} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
// ho lavorato con i video come sfondo, mi son ritrovato in un mari di problemi in un attimo! mi ero ripromesso di farlo, i siti che mi piacciono di più hanno
// quasi sempre uno sfondo dinamico. Lavorarci però non è semplice. per visualizzare correttamente la pagina bisognerebbe usare lo zoom del browser al 50%. Forse avrei bisogno
// di video uguali ma con formati differenti (16:9 && 9:16) e di gestire il loro scambio tramite una media query, devo indagare.
