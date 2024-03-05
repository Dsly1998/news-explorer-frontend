// SavedNews.js

import React, { useState, useEffect } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import { getSavedArticles, deleteArticle } from "../../utils/LocalStorage";
import Footer from "../Footer/Footer";
import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";
import "./SavedNews.css";

function SavedNews({ currentUser, handleLogout }) {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const articles = getSavedArticles();
    setSavedArticles(articles);
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
      <div className="saved-news__cards">
        <div className="saved-news__container">
          {savedArticles.map((article) => (
            <NewsCard
              key={article.title}
              article={article}
              onSave={handleUnsaveArticle}
              isInSavedNewsRoute={true}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SavedNews;
