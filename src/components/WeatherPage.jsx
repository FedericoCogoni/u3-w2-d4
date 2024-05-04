import React, { useState, useEffect } from "react"
import { Card, CardText, Col, Container, Row } from "react-bootstrap"
import Clear from "../assets/Clear.mp4"
import Clouds from "../assets/Clouds.mp4"
import Rain from "../assets/Rain.mp4"
import Fog from "../assets/Fog.mp4"
import Snow from "../assets/Snow.mp4"
import Thunderstorm from "../assets/Thunderstorm.mp4"
import NavigationBar from "./ArrowLeft"

function WeatherPage({ position }) {
  console.log(position)
  const [currentConditions, setCurrentConditions] = useState(null)
  const [futureForecast, setFutureForecast] = useState(null)

  useEffect(() => {
    const apiKey = "5c726fab9469a91b67bc55d8bc886dc2"
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?${position}&appid=${apiKey}`
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?${position}&appid=${apiKey}`

    const fetchWeather = () => {
      console.log(urlCurrent)
      fetch(urlCurrent)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          setCurrentConditions(data)
          console.log(data)
        })
        .catch(error => {
          console.error("Failed to fetch current weather data:", error)
        })
    }

    const fetchForecast = () => {
      fetch(urlForecast)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          setFutureForecast(data)
          console.log(data)
        })
        .catch(error => {
          console.error("Failed to fetch forecast data:", error)
        })
    }

    fetchWeather()
    fetchForecast()
  }, [position])

  function getCurrentDate() {
    const date = new Date()
    return date.toLocaleDateString("it-IT", { year: "numeric", month: "numeric", day: "numeric" })
  }

  function getDayOfWeek(time = new Date().getTime() / 1000) {
    const date = new Date(time * 1000)
    return date.toLocaleDateString("it-IT", { weekday: "long" })
  }

  const getIconUrl = icon => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const Background = weather => {
    const videos = {
      Thunderstorm: Thunderstorm,
      Clear: Clear,
      Fog: Fog,
      Clouds: Clouds,
      Snow: Snow,
      Rain: Rain,
    }
    return videos[weather]
  }

  let backgroundVideo = ""
  if (currentConditions && currentConditions.weather && currentConditions.weather[0]) {
    const weatherStatus = currentConditions.weather[0].main
    backgroundVideo = Background(weatherStatus, true)
  }

  // mi sono appena reso conto che il metodo di filtraggio non è totalmente attendibile.
  // Per esserlo l'array dovrebbe sempre partire dalla mezzanotte, ma ormai è tardi per cambiarlo.
  // procederò alla modifica di questo ragionamento appena avrò qualche ora di tempo.
  // Ero convinto di aver trovato una soluzione intelligente,
  // scoprire l'errore così tardi mi amareggia tantissimo.

  return (
    <>
      <video key={backgroundVideo} autoPlay loop muted className="video-bg background-opacity">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Container fluid className="bg-dark px-0">
        <NavigationBar />
        <Row className="responsive pageContainer">
          <Col sm={6} className="d-flex justify-content-center align-items-center">
            {currentConditions && (
              <Card className="text-center border-0 mb-2 mt-2 rounded-4 forecastCard cardBgSoft">
                <Card.Header className="display-1 border-0 text-wrap">
                  {" "}
                  {currentConditions.name}
                </Card.Header>
                <Card.Text className="display-5 text-wrap">{getDayOfWeek()}</Card.Text>
                <Card.Body>
                  <CardText className="display-5 text-wrap ">{getCurrentDate()}</CardText>
                  <Card.Title className="display-5 text-wrap">
                    {(currentConditions.main.temp - 273.15).toFixed(0)} °C
                  </Card.Title>

                  <Card.Text className="display-6 text-wrap">
                    <img
                      src={getIconUrl(currentConditions.weather[0].icon)}
                      alt="Weather icon"
                      style={{ width: "140px" }}
                      className="mb-1"
                    />
                  </Card.Text>
                  <Card.Text className="display-6 text-wrap">
                    Vento: {(currentConditions.wind.speed * 3.6).toFixed(0)} km/h
                  </Card.Text>
                  <Card.Text className="display-6 text-wrap">
                    Umidità: 💦 {currentConditions.main.humidity}%
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col sm={6} className="d-flex flex-column align-items-center mt-auto mb-auto">
            {futureForecast &&
              futureForecast.list
                .filter((i, index) => index % 10 === 0)
                .map((day, index) => (
                  <Card key={index} className="border-0 rounded-4 mb-3  cardBgSoft">
                    <Card.Body className="d-flex align-items-center justify-content-center text-wrap">
                      <h4 className="display-6">
                        {getDayOfWeek(day.dt)} {(day.main.temp - 273.15).toFixed(0)}°C
                      </h4>
                      <img src={getIconUrl(day.weather[0].icon)} alt="weather icon" />
                    </Card.Body>
                  </Card>
                ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default WeatherPage
