// SavedNewsInfo.js

import React from "react";
import "./SavedNewsInfo.css"; // Ensure this CSS file has the correct styles

function SavedNewsInfo({ username, savedArticles, keywords }) {
  // Use the passed keywords prop directly
  const firstTwoKeywords = keywords.slice(0, 2).join(", ");
  const otherKeywordCount = keywords.length > 2 ? keywords.length - 2 : 0;

  return (
    <div className="saved-news-info">
      <div className="saved-articles-title">Saved articles</div>
      <div className="user-saved-articles">
        {username}, you have {savedArticles.length} saved articles
      </div>
      <div className="by-keywords">
        By keywords:
        <span className="keywords">{firstTwoKeywords}</span>
        {otherKeywordCount > 0 && (
          <span className="other-keywords">
            , and {otherKeywordCount} other
          </span>
        )}
      </div>
    </div>
  );
}

export default SavedNewsInfo;
