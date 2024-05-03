import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Search from "./components/Search"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WeatherPage from "./components/WeatherPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/weather/:latitude/:longitude" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
