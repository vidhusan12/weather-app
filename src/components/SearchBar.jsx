import React from "react";
import "../styles/App.css"

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} id="search-form">
      <div className="search-controls">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">Search</button>
      </div>
    </form>
  );

}

export default SearchBar;