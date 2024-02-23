import React, { useState } from "react";
import "./SearchForm.css";
import fetchNews from "../../utils/NewsApi";
import NewsCardList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [articles, setArticles] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setSearchPerformed(true);
    try {
      const fetchedArticles = await fetchNews(searchTerm);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
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
        />
        <button className="Search-Form__search-button" onClick={handleSearch}>Search</button>
      </div>
      {searchPerformed && (
        articles.length > 0 ? <NewsCardList articles={articles} /> : <NotFound />
      )}
    </div>
  );
}

export default SearchForm;
