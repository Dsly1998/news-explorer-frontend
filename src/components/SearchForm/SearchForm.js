import React, { useState } from "react";
import "./SearchForm.css";
import fetchNews from "../../utils/NewsApi";
import NewsCardList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader_temp";

function SearchForm({ isLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setSearchPerformed(true);
    setIsLoading(true); // Start loading
    try {
      const fetchedArticles = await fetchNews(searchTerm);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of the outcome
    }
  };

  return (
    <div className="Search-Form">
      <div className="Search-Form__search-bar">
        <input
          type="text"
          className="Search-Form__search-input"
          placeholder="Enter topic"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="Search-Form__search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        searchPerformed &&
        (articles.length > 0 ? (
          <NewsCardList articles={articles} isLoggedIn={isLoggedIn} />
        ) : (
          <NotFound />
        ))
      )}
    </div>
  );
}

export default SearchForm;
