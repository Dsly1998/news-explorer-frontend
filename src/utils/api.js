const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.articlelist.ignorelist.com"
    : "http://localhost:3001";

// Fetch articles by a user
export const getArticlesByUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const articles = await response.json();
  return Array.isArray(articles) ? articles : [];
};

// Create a new article
export const createArticle = async (articleData, token) => {
  const { isSaved, ...dataToSend } = articleData; // Destructure to remove isSaved
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend), // Send without isSaved
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
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

// export const isArticleSaved = async (articleId, token) => {
//   try {
//     console.log("Checking saved status for article ID:", articleId); // Log the articleId
//     const articles = await getArticlesByUser(token);
//     return articles.some((article) => article._id === articleId);
//   } catch (error) {
//     console.error("Error checking if article is saved:", error);
//   }
// };
