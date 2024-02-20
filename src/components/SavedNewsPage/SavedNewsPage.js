import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'; // Import the SavedNewsHeader component
import NewsCardList from '../NewsCardList/NewsCardList'; // Assuming this is your component to list out news cards
import './SavedNewsPage.css'; // Your styles for the SavedNewsPage

function SavedNewsPage({ userName, savedArticles }) {
  // Example calculation of keywords based on saved articles
  // This is a placeholder. You'll need to replace it with your actual logic
  const keywords = ['Nature', 'Yellowstone', '...2 other'];

  return (
    <div className="saved-news-page">
      <SavedNewsHeader 
        userName={userName} 
        articleCount={savedArticles.length} 
        keywords={keywords} 
      />
      <NewsCardList articles={savedArticles} /> {/* Render the list of saved news articles */}
      {/* Add any other components that make up the SavedNewsPage */}
    </div>
  );
}

export default SavedNewsPage;
