import React, { useState, useEffect } from "react";
import MobileHeader from "../MobileHeader/MobileHeader"; // Make sure the path is correct
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import { getSavedArticles, deleteArticle } from "../../utils/LocalStorage";
import Footer from "../Footer/Footer";
import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import "./SavedNews.css";

function SavedNews({ currentUser, handleLogout }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const articles = getSavedArticles();
    setSavedArticles(articles);
    setIsLoading(false); // Set loading to false once articles are fetched

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleUnsaveArticle = (articleToDelete) => {
    deleteArticle(articleToDelete);
    setSavedArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== articleToDelete.id)
    );
  };

  const extractKeywords = (articles) => {
    const allKeywords = articles.flatMap((article) =>
      article.searchKeyword ? [article.searchKeyword] : []
    );
    return Array.from(new Set(allKeywords));
  };

  const keywords = extractKeywords(savedArticles);

  return (
    <div className="saved-news__page">
      {isMobile ? (
        <MobileHeader currentRoute="saved-news" />
      ) : (
        <SavedNewsHeader
          userName={currentUser ? currentUser.name : ""}
          onLogout={handleLogout}
        />
      )}
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
        <NotFound />
      )}
      <Footer />
    </div>
  );
}

export default SavedNews;
