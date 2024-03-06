import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { saveArticle, isArticleSaved } from "../../utils/LocalStorage";
import "./NewsCardList.css";

function NewsCardList({ articles, isLoggedIn }) {
  const [visibleArticles, setVisibleArticles] = useState(3);

  // Handle saving an article
  const onSave = (article) => {
    if (!isArticleSaved(article)) {
      saveArticle(article);
      // Add any additional logic if needed after saving the article
    }
  };

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="news-card-list">
      <h2 className="news-card-list__title">Search Results</h2>
      <div className="news-card-list__grid">
        {articles.slice(0, visibleArticles).map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            onSave={onSave}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
      {visibleArticles < articles.length && (
        <button
          onClick={loadMoreArticles}
          className="news-card-list__load-more"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
