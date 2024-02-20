import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
// Import styles and any other necessary components

function NewsCardList({ articles }) {
  // Check if articles is not undefined and has length
  if (!articles || articles.length === 0) {
    return <div>No articles found.</div>; // Or any other appropriate fallback UI
  }

  return (
    <div className="news-card-list">
      {articles.map(article => <NewsCard key={article.id} article={article} />)}
      {/* Render NewsCard components for each article */}
    </div>
  );
}

export default NewsCardList;
