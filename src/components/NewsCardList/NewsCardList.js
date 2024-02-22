import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css"; // Import the CSS file for styling

function NewsCardList({ articles }) {
  const [visibleArticles, setVisibleArticles] = useState(3);

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="news-card-list">
      <h2 className="news-card-list__title">Search Results</h2>
      <div className="news-card-list__grid">
        {articles.slice(0, visibleArticles).map((article) => (
          <NewsCard key={article.url} article={article} />
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
