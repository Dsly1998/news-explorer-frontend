import React from 'react';
import SavedNewsHeader from './SavedNewsHeader';
import NewsCardList from './NewsCardList';
// Import other necessary components and styles

function SavedNews() {
  return (
    <div className="saved-news">
      <SavedNewsHeader />
      <NewsCardList />
      {/* You can add more components or content here if needed */}
    </div>
  );
}

export default SavedNews;
