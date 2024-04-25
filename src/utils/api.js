const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.articlelist.ignorelist.com"
    : "http://localhost:3001";

export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

// Fetch articles by a user
export const getArticlesByUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
  return await response
    .json()
    .then((data) => (Array.isArray(data) ? data : []));
};

// Create a new article
export const createArticle = async (articleData, token) => {
  const { isSaved, ...dataToSend } = articleData; // Destructure to remove isSaved from the data sent to the server
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  }).then(checkResponse);
  return await response.json();
};

// Delete an article
export const deleteArticle = async (articleId, token) => {
  const response = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
  return await response.json();
};

// Check if an article is saved
export const isArticleSaved = async (articleId, token) => {
  try {
    console.log("Checking saved status for article ID:", articleId);
    const articles = await getArticlesByUser(token);
    return articles.some((article) => article._id === articleId);
  } catch (error) {
    console.error("Error checking if article is saved:", error);
  }
};
