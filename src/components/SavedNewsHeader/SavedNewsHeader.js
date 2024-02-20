import React from 'react';
import './SavedNewsHeader.css'; // Make sure to create and link a corresponding CSS file

function SavedNewsHeader({ userName, articleCount, keywords }) {
  return (
    <div className="saved-news-header" style={{ backgroundColor: 'rgba(209, 210, 214, 1)' }}>
      <h2 className="saved-news-title">Saved articles</h2>
      <h1 className="user-article-info">{userName}, you have {articleCount} saved articles</h1>
      <p className="keywords-info">
        By keywords: <span>{keywords.join(', ')}</span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
