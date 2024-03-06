// SavedNews.js

import React, { useState, useEffect } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import { getSavedArticles, deleteArticle } from "../../utils/LocalStorage";
import Footer from "../Footer/Footer";
import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";
import NotFound from "../NotFound/NotFound"; // Import NotFound
import Preloader from "../Preloader/Preloader"; // Import Preloader
import "./SavedNews.css";

function SavedNews({ currentUser, handleLogout }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const articles = getSavedArticles();
    setSavedArticles(articles);
    setIsLoading(false); // Set loading to false once articles are fetched
  }, []);

  const handleUnsaveArticle = (articleToDelete) => {
    deleteArticle(articleToDelete);
    setSavedArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== articleToDelete.id)
    );
  };

  // Extract search keywords from articles
  const extractKeywords = (articles) => {
    const allKeywords = articles.flatMap((article) =>
      article.searchKeyword ? [article.searchKeyword] : []
    );
    return Array.from(new Set(allKeywords)); // Remove duplicates
  };

  const keywords = extractKeywords(savedArticles);

  return (
    <div className="saved-news__page">
      <SavedNewsHeader
        userName={currentUser ? currentUser.name : ""}
        onLogout={handleLogout}
      />
      <SavedNewsInfo
        username={currentUser ? currentUser.name : "User"}
        savedArticles={savedArticles}
        keywords={keywords}
      />
      {isLoading ? (
        <Preloader />
      ) : savedArticles.length > 0 ? (
        <div className="saved-news__cards">
          <div className="saved-news__container">
            {savedArticles.map((article) => (
              <NewsCard
                key={article.title}
                article={article}
                onSave={handleUnsaveArticle}
                isInSavedNewsRoute={true}
                keywords={keywords}
              />
            ))}
          </div>
        </div>
      ) : (
        <NotFound /> // Show NotFound if there are no saved articles
      )}
      <Footer />
    </div>
  );
}

export default SavedNews;