// newsApi.js

const API_KEY = "7d5aa8655b694d14aef74cac887fb786";
const BASE_URL = "https://nomoreparties.co/news/v2";

const fetchNews = async (keyword) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  const toDate = new Date();
  const formatDate = (date) => date.toISOString().split("T")[0];

  const url = `${BASE_URL}/everything?q=${encodeURIComponent(
    keyword
  )}&from=${formatDate(fromDate)}&to=${formatDate(
    toDate
  )}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    // Include the search keyword in each article object
    return data.articles.map((article) => ({
      ...article,
      searchKeyword: keyword,
    }));
  } catch (error) {
    console.error("Fetch News Error:", error);
    throw error;
  }
};

export default fetchNews;
