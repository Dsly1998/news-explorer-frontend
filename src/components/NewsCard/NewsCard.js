import React from "react";
import "./NewsCard.css";
import bookmark from "../../images/bookmark.svg"
// Import styles

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card__image"
        />
        <button className="news-card__button--save">
          <img src={bookmark} className="news-card__bookmark" alt="bookmark" />
        </button>
      </div>
      <div className="news-card__content">
        <span className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <span className="news-card__source">{article.source.name}</span>
      </div>
    </div>
  );
}

export default NewsCard;
