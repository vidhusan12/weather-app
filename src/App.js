import React, { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [city, setCity] = useState(""); //To track the input from the user
  const [weatherData, setWeatherData] = useState(null);

  //handle function
  function handleInputChange(newValue) {
    setCity(newValue);
  }

  //hanlde search submit function
  function handleSearchSubmit(e) {
    e.preventDefault();

    const apiKey = "1e7677f38abca773b7f6c9fab0e53dae";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(error => {
        console.log("Error fetching weather:", error);
      });

    console.log("Searching for weather in:", city);
  }

  return (
    <>
      <SearchBar
        value={city}
        onChange={handleInputChange}
        onSubmit={handleSearchSubmit}

      />

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}

    </>
  )

}

export default App;
