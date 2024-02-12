import React from 'react';
// Import styles

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <img src={article.imageUrl} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      {/* Include other article details as necessary */}
    </div>
  );
}

export default NewsCard;
