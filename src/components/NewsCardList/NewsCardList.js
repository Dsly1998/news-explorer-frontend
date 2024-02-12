import React from 'react';
import NewsCard from './NewsCard';
// Import styles and any other necessary components

function NewsCardList({ articles }) {
  return (
    <div className="news-card-list">
      {articles.map(article => <NewsCard key={article.id} article={article} />)}
      {/* Render NewsCard components for each article */}
    </div>
  );
}

export default NewsCardList;
