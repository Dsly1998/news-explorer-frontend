import React, { useState, useEffect } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import PopupMenu from "../PopupMenu/PopupMenu"; // Import PopupMenu component
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
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const articles = getSavedArticles();
    setSavedArticles(articles);
    setIsLoading(false); 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUnsaveArticle = (articleToDelete) => {
    deleteArticle(articleToDelete); // Updates local storage
    setSavedArticles((currentArticles) =>
      currentArticles.filter(
        (article) => article.title !== articleToDelete.title
      )
    );
  };

  const extractKeywords = (articles) => {
    const allKeywords = articles.flatMap((article) =>
      article.searchKeyword ? [article.searchKeyword] : []
    );
    return Array.from(new Set(allKeywords));
  };

  const keywords = extractKeywords(savedArticles);

  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen);
  };

  return (
    <div className="saved-news__page">
      {isMobile ? (
        <MobileHeader currentRoute="saved-news" onMenuClick={togglePopupMenu} />
      ) : (
        <SavedNewsHeader
          userName={currentUser ? currentUser.name : ""}
          onLogout={handleLogout}
        />
      )}
      <PopupMenu
        isOpen={isPopupMenuOpen}
        onClose={togglePopupMenu}
        isLoggedIn={currentUser != null}
        userName={currentUser ? currentUser.name : ""}
        onLogout={handleLogout} // Ensure this prop is correctly implemented
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
                onArticleDelete={handleUnsaveArticle}
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
