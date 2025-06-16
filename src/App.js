import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import "./styles/App.css";

function App() {
  const [city, setCity] = useState(""); //To track the input from the user
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //handle function
  function handleInputChange(newValue) {
    setError("")
    setCity(newValue);

  }

  //hanlde search submit function
  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name...");
      return;
    }

    const apiKey = "1e7677f38abca773b7f6c9fab0e53dae";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setWeatherData(null); //clear old result
    setLoading(true);
    setError(null);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== 200) {
          setError("City not found. Try again.");
          setLoading(false);
          return;
        }

        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError("Could not fetch weather. Try a valid city.");
        setLoading(false);
      });

    console.log("Searching for weather in:", city);
  }



  return (
    <>
      <div className="app-container">
        <h1>BreezeBox</h1>
        <SearchBar
          value={city}
          onChange={handleInputChange}
          onSubmit={handleSearchSubmit}

        />
        {loading && <p className="status-text">Loading...</p>}
        {error && <p className="status-text error">{error}</p>}
        {weatherData && (
          <div className="weather-box">
            {(() => {
              const iconCode = weatherData.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
              return <img src={iconUrl} alt="Weather Icon" className="weather-icon" />
            })()}
            <h2>{weatherData.name.charAt(0).toUpperCase() + weatherData.name.slice(1)}</h2>
            <p className="temp">{weatherData.main.temp}°C</p>
            <p className="desc">{weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  )

}

export default App;
