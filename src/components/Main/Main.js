import React from "react";
import "./Main.css";

function Main({ handleSearch, setSearchTerm }) {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <main className="main">
      <h1 className="main__title">What's going on in the world?</h1>
      <p className="main__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>
      <div className="main__search-bar">
        <input
          type="text"
          className="main__search-input"
          placeholder="Enter topic"
          onChange={handleInputChange}
        />
        <button className="main__search-button" onClick={handleSearch}>Search</button>
      </div>
    </main>
  );
}

export default Main;
