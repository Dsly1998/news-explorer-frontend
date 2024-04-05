const API_BASE_URL = "http://localhost:3001"; // Replace with your actual backend server URL

// Fetch articles by a user
export const getArticlesByUser = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const articles = await response.json();
    return Array.isArray(articles) ? articles : [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return []; // Return an empty array in case of error
  }
};

// Create a new article
export const createArticle = async (articleData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating article:", error);
  }
};

// Delete an article
export const deleteArticle = async (articleId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};

// Check if an article is saved
export const isArticleSaved = async (articleId, token) => {
  try {
    const articles = await getArticlesByUser(token);
    return articles.some((article) => article._id === articleId);
  } catch (error) {
    console.error("Error checking if article is saved:", error);
  }
};
