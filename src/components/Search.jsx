import React, { useState, useEffect } from "react"
import { Container, FormControl, Alert, Button, Spinner } from "react-bootstrap"
import IndexVideo from "../assets/IndexVideo.mp4"
import { useNavigate } from "react-router-dom"

function Search({ setPosition }) {
  const [inputValue, setInputValue] = useState("")
  const [alertInfo, setAlertInfo] = useState({ visible: false, text: "" })
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const searches = localStorage.getItem("recentSearches")
    if (searches) {
      setRecentSearches(JSON.parse(searches))
    }
  }, [])

  const displayAlert = text => {
    setAlertInfo({ visible: true, text })
    setTimeout(() => setAlertInfo({ visible: false, text: "" }), 3000)
  }

  const handleLocationSearch = city => {
    setLoading(true)
    const apiKey = "5c726fab9469a91b67bc55d8bc886dc2"
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}&lang=it`

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Risposta della rete non valida")
        }
        return response.json()
      })
      .then(result => {
        setLoading(false)
        if (result.length === 0) {
          displayAlert("Nessuna città trovata")
          return
        }
        updateRecentSearches(city)
        const coordinates = `lat=${result[0].lat}&lon=${result[0].lon}`
        setPosition(coordinates)
        navigate(`/weather`)
      })
      .catch(error => {
        setLoading(false)
        console.error("Errore durante la fetch", error)
        displayAlert("Errore durante la fetch")
      })
  }

  const updateRecentSearches = city => {
    const updatedSearches = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  const handleGeoSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        setPosition(coordinates)
        navigate(`/weather`)
      })
    } else {
      displayAlert("Geolocalizzazione non supportata dal browser.")
    }
  }

  const onSubmitSearch = event => {
    event.preventDefault()
    if (!inputValue) {
      displayAlert("Inserisci il nome di una città per la ricerca.")
      return
    }
    handleLocationSearch(inputValue)
  }

  return (
    <div>
      <video autoPlay loop muted className="video-bg">
        <source src={IndexVideo} type="video/mp4" />
      </video>
      <Container className="search-container">
        <h1 className="text-center myTitle">EpiWeather</h1>

        <form onSubmit={onSubmitSearch} className="search-form">
          <FormControl
            type="text"
            placeholder="🔍 Cerca una città"
            className="mt-5 fs-2"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {recentSearches.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
          <Button onClick={handleGeoSearch} variant="bg-transparent fs-2 myPosition">
            Usa la mia posizione
          </Button>
        </form>
        {loading && <Spinner animation="border" />}
        {alertInfo.visible && (
          <Alert variant="danger" className="search-alert mt-3">
            {alertInfo.text}
          </Alert>
        )}
      </Container>
    </div>
  )
}

export default Search
