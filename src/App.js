import React, {useState} from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [city, setCity] = useState(""); //To track the input from the user

  //handle function
  function handleInputChange(newValue) {
    setCity(newValue);
  }

  //hanlde search submit function
  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log("Searching for weather in:", city);
  }

  return (
    <>
      <SearchBar
        value={city}
        onChange={handleInputChange}
        onSubmit={handleSearchSubmit}

      />

    </>
  )

}

export default App;
