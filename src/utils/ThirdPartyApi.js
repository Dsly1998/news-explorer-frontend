// utils/ThirdPartyApi.js

const API_KEY = 'your_api_key'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2';
const PROXY_URL = 'https://nomoreparties.co/news/v2';

// Add a parameter to determine whether to use the proxy
const fetchNews = async (query, from, to, useProxy = false, pageSize = 100) => {
  const url = `${useProxy ? PROXY_URL : BASE_URL}/everything?q=${query}&from=${from}&to=${to}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export { fetchNews };
