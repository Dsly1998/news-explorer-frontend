import React, { useState, useEffect } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import PopupMenu from "../PopupMenu/PopupMenu";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import { getArticlesByUser, deleteArticle } from "../../utils/api"; // Adjust this path
import Footer from "../Footer/Footer";
import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import "./SavedNews.css";

function SavedNews({ currentUser, handleLogout, token }) {
  // Ensure token is passed as a prop
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);

    // Fetch saved articles
    const fetchSavedArticles = async () => {
      try {
        const articles = await getArticlesByUser(token);
        setSavedArticles(articles);
      } catch (error) {
        console.error("Error fetching saved articles:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser && token) {
      fetchSavedArticles();
    } else {
      setIsLoading(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [currentUser, token]);

  const handleUnsaveArticle = async (articleId) => {
    try {
      await deleteArticle(articleId, token);
      setSavedArticles((currentArticles) =>
        currentArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting article:", error);
      // Handle error
    }
  };

  const extractKeywords = (articles) => {
    const allKeywords = articles.flatMap((article) =>
      article.searchKeyword ? [article.searchKeyword] : []
    );
    return Array.from(new Set(allKeywords));
  };

  const keywords = extractKeywords(savedArticles);

  const togglePopupMenu = () => setIsPopupMenuOpen(!isPopupMenuOpen);
  return (
    <div className="saved-news__page">
      {isMobile ? (
        <MobileHeader currentRoute="saved-news" onMenuClick={togglePopupMenu} />
      ) : (
        <SavedNewsHeader
          name={currentUser ? currentUser.name : ""}
          onLogout={handleLogout}
        />
      )}
      <PopupMenu
        isOpen={isPopupMenuOpen}
        onClose={togglePopupMenu}
        isLoggedIn={currentUser != null}
        nameame={currentUser ? currentUser.name : ""}
        onLogout={handleLogout} // Ensure this prop is correctly implemented
      />

      <SavedNewsInfo
        name={currentUser ? currentUser.name : "User"}
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
                key={article._id} // Use _id instead of title for key
                article={article}
                onArticleDelete={handleUnsaveArticle}
                isInSavedNewsRoute={true}
                isLoggedIn={!!currentUser}
                token={token}
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
