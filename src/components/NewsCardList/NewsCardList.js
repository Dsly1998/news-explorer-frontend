import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { createArticle, getArticlesByUser } from "../../utils/api"; // Adjust this path
import "./NewsCardList.css";

function NewsCardList({ articles, isLoggedIn, token, onSignInClick }) {
  // Ensure token is passed as a prop
  const [visibleArticles, setVisibleArticles] = useState(3);

  // Handle saving an article
  const onSave = async (article) => {
    try {
      const savedArticles = await getArticlesByUser(token);
      const isSaved = savedArticles.some(
        (savedArticle) => savedArticle._id === article._id
      );
      if (!isSaved) {
        await createArticle(article, token);
        // Add any additional logic if needed after saving the article
      }
    } catch (error) {
      console.error("Error saving article:", error);
      // Handle error appropriately
    }
  };

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__grid">
        {articles.slice(0, visibleArticles).map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            onSave={onSave}
            isLoggedIn={isLoggedIn}
            token={token} // Pass the token to NewsCard
            onSignInClick={onSignInClick}
          />
        ))}
      </div>
      {visibleArticles < articles.length && (
        <button
          onClick={loadMoreArticles}
          className="news-card-list__load-more"
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
