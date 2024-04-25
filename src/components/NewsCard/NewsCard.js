import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import bookmark from "../../images/bookmark.svg";
import bookmarkFilled from "../../images/bookmarkfilled.svg";
import bookmarkBlack from "../../images/bookmarkblack.svg";
import trash from "../../images/trash.svg";
import trashDark from "../../images/trash-black.svg";
import {
  createArticle,
  getArticlesByUser,
  deleteArticle,
} from "../../utils/api";

function NewsCard({
  article,
  isInSavedNewsRoute,
  onArticleSave,
  onArticleDelete,
  isLoggedIn,
  token,
  onSignInClick,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkIfArticleIsSaved = async () => {
      const articles = await getArticlesByUser(token);
      setIsSaved(
        articles.some((savedArticle) => savedArticle.url === article.url)
      );
    };

    if (isLoggedIn) {
      checkIfArticleIsSaved();
    }
  }, [article, isLoggedIn, token]);

  const handleSaveClick = async () => {
    if (!isLoggedIn) {
      onSignInClick(); // Triggering the login/registration popup
      return;
    }

    if (isSaved) {
      const savedArticles = await getArticlesByUser(token);
      const articleToDelete = savedArticles.find(
        (savedArticle) => savedArticle.url === article.url
      );

      if (articleToDelete) {
        // Delete the article using the deleteArticle function
        await deleteArticle(articleToDelete._id, token);
        setIsSaved(false); // Update state to reflect that the article is no longer saved
        onArticleDelete && onArticleDelete(articleToDelete._id); // Optional: trigger any additional cleanup
      } else {
        console.error("Failed to find the article to delete by URL");
      }
    } else {
      // If the bookmark is not filled, save the article
      await createArticle(article, token);
      setIsSaved(true);
      onArticleSave && onArticleSave(article);
    }
  };

  const icon = isInSavedNewsRoute
    ? hovered
      ? trashDark
      : trash
    : isSaved
    ? bookmarkFilled
    : hovered
    ? bookmarkBlack
    : bookmark;

  const buttonClass = isInSavedNewsRoute
    ? "news-card__button--delete"
    : "news-card__button--save";

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card__image"
        />
        <div className="news-card__container">
          {isInSavedNewsRoute && article.searchKeyword && (
            <div className="news-card__keyword-container">
              <div className="news-card__keyword-bubble">
                {article.searchKeyword}
              </div>
            </div>
          )}
          {hovered && !isLoggedIn && !isInSavedNewsRoute && (
            <div className="news-card__hover-container-login">
              <p className="news-card__hover-text">Sign in to save articles</p>
            </div>
          )}
          {hovered && isInSavedNewsRoute && (
            <div className="news-card__hover-container">
              <p className="news-card__hover-text">Remove from saved</p>
            </div>
          )}
          <button
            className={buttonClass}
            onClick={handleSaveClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={icon}
              alt={isInSavedNewsRoute ? "Delete article" : "Save article"}
              className={`news-card__icon ${
                hovered ? "news-card__icon--hovered" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div className="news-card__content">
        <span className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <h3 className="news-card__title">{article.content}</h3>
        <p className="news-card__description">{article.description}</p>
        <span className="news-card__source">{article.source.name}</span>
      </div>
    </div>
  );
}

export default NewsCard;
