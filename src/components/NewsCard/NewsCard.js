import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import bookmark from "../../images/bookmark.svg";
import bookmarkFilled from "../../images/bookmarkfilled.svg";
import bookmarkBlack from "../../images/bookmarkblack.svg"; // Path to your black bookmark icon
import trash from "../../images/trash.svg";
import trashDark from "../../images/trash-black.svg"; // Path to your dark trash icon
import {
  isArticleSaved,
  saveArticle,
  deleteArticle,
} from "../../utils/LocalStorage";

function NewsCard({
  article,
  isInSavedNewsRoute,
  onArticleSave,
  onArticleDelete,
  isLoggedIn,
}) {
  const [isSaved, setIsSaved] = useState(isArticleSaved(article));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setIsSaved(isArticleSaved(article));
  }, [article]);

  const handleSaveClick = () => {
    if (!isLoggedIn && !isInSavedNewsRoute) return;
    if (isInSavedNewsRoute) {
      deleteArticle(article);
      onArticleDelete && onArticleDelete(article);
    } else {
      if (!isSaved) {
        saveArticle(article);
        setIsSaved(true);
        onArticleSave && onArticleSave(article);
      }
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
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <span className="news-card__source">{article.source.name}</span>
      </div>
    </div>
  );
}

export default NewsCard;
