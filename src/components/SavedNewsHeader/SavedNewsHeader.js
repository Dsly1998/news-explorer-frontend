import React from 'react';
// Import styles

function SavedNewsHeader({ savedArticlesCount }) {
  return (
    <div className="saved-news-header">
      <h2>Saved Articles</h2>
      <p>You have {savedArticlesCount} saved articles</p>
      {/* Additional information can go here */}
    </div>
  );
}

export default SavedNewsHeader;
