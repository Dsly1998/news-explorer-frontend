import React, { useState } from "react";
import "./Main.css";
import fetchNews from "../../utils/NewsApi"; // Import the fetchNews function
import NewsCardList from "../NewsCardList/NewsCardList"; // Import the NewsCardList component

function Main() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [articles, setArticles] = useState([]); // State for news articles
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm) return; // Optional: add more validation as needed
    setIsLoading(true);
    setError(null);
    try {
      const fetchedArticles = await fetchNews(searchTerm);
      setArticles(fetchedArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button className="main__search-button" onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && articles.length > 0 && (
        <NewsCardList articles={articles} />
      )}
    </main>
  );
}

export default Main;
