import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import bookmark from "../../images/bookmark.svg";
import bookmarkFilled from "../../images/bookmark-filled.svg";
import trash from "../../images/trash.svg"; // Path to your trash icon
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
}) {
  // Local state to manage the saved status of the article
  const [isSaved, setIsSaved] = useState(isArticleSaved(article));

  // Determine which icon to use based on the route and save status
  const icon = isInSavedNewsRoute ? trash : isSaved ? bookmarkFilled : bookmark;

  // Handle the click on the save/delete button
  const handleSaveClick = () => {
    if (isInSavedNewsRoute || isSaved) {
      deleteArticle(article); // Delete the article from saved articles
      setIsSaved(false); // Update the local state
      onArticleDelete && onArticleDelete(article);
    } else {
      saveArticle(article); // Save the article
      setIsSaved(true); // Update the local state
      onArticleSave && onArticleSave(article);
    }
  };

  // Update the local state if the saved status of the article changes externally
  useEffect(() => {
    setIsSaved(isArticleSaved(article));
  }, [article]);

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card__image"
        />
        <button className="news-card__button--save" onClick={handleSaveClick}>
          <img
            src={icon}
            alt={isInSavedNewsRoute ? "Delete article" : "Save article"}
            className="news-card__bookmark"
          />
        </button>
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
