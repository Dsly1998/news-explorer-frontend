import React, { useState } from "react";
import "./SearchForm.css";
import fetchNews from "../../utils/NewsApi";
import NewsCardList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";

function SearchForm({ isLoggedIn, token, onSignInClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    setSearchPerformed(true);
    setIsLoading(true);
    try {
      const fetchedArticles = await fetchNews(searchTerm);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="search-form">
      <form onSubmit={handleSearch} className="search-form__search-bar">
        <input
          type="text"
          className="search-form__search-input"
          placeholder="Enter topic"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-form__search-button">
          Search
        </button>
      </form>

      {isLoading ? (
        <Preloader />
      ) : (
        searchPerformed &&
        (articles.length > 0 ? (
          <NewsCardList
            articles={articles}
            isLoggedIn={isLoggedIn}
            token={token}
            onSignInClick={onSignInClick}
          />
        ) : (
          <NotFound />
        ))
      )}
    </section>
  );
}

export default SearchForm;
