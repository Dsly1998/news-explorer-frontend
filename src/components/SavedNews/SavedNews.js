import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
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
