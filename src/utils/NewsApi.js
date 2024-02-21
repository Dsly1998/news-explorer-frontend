// newsApi.js

const API_KEY = '7d5aa8655b694d14aef74cac887fb786';  // Replace with your actual News API key
const BASE_URL = 'https://newsapi.org/v2';

const fetchNews = async (keyword) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);  // Set to 7 days ago
  const toDate = new Date();  // Today's date

  const formatDate = (date) => date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  const url = `${BASE_URL}/everything?q=${encodeURIComponent(keyword)}&from=${formatDate(fromDate)}&to=${formatDate(toDate)}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Fetch News Error:', error);
    throw error;
  }
};

export default fetchNews;
