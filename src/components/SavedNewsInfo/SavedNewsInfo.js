import React from "react";
import "./SavedNewsInfo.css";

function SavedNewsInfo({ username, savedArticles, keywords }) {
  const firstTwoKeywords = keywords.slice(0, 2).join(", ");
  const otherKeywordCount = keywords.length > 2 ? keywords.length - 2 : 0;

  return (
    <section className="saved-news-info">
      <h2 className="saved-news-info__title">Saved articles</h2>
      <p className="saved-news-info__stats">
        {username}, you have {savedArticles.length} saved articles
      </p>
      <p className="saved-news-info__keywords">
        By keywords:
        <span className="saved-news-info__keywords-list">
          {firstTwoKeywords}
        </span>
        {otherKeywordCount > 0 && (
          <span className="saved-news-info__keywords-other">
            , and {otherKeywordCount} other
          </span>
        )}
      </p>
    </section>
  );
}

export default SavedNewsInfo;
