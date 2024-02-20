// components/NewsPage.js

import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../utils/ThirdPartyApi';

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const getFormattedDate = (date) => date.toISOString().split('T')[0];

    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);

    const query = 'example'; // Replace with your actual query

    const loadData = async () => {
        try {
          setLoading(true);
          const useProxy = false; // Set to true when deploying
          const data = await fetchNews(query, getFormattedDate(fromDate), getFormattedDate(toDate), useProxy);
          setArticles(data.articles);
        } catch (err) {
          // ... error handling ...
        } finally {
          setLoading(false);
        }
      };
    
      loadData();
    }, []);

  const showMoreArticles = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {articles.slice(0, visibleCount).map(article => (
        <div key={article.title}>{article.title}</div> // Simplified rendering
      ))}
      {visibleCount < articles.length && (
        <button onClick={showMoreArticles}>Show More</button>
      )}
    </div>
  );
}

export default NewsPage;
