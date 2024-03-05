// utils/localStorageUtils.js

const LOCAL_STORAGE_KEY = "savedArticles";

export const saveArticle = (newArticle) => {
  const savedArticles = getSavedArticles();
  const articleExists = savedArticles.some(
    (article) => article.title === newArticle.title
  );

  if (!articleExists) {
    const updatedArticles = [...savedArticles, newArticle];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedArticles));
    console.log("Article saved:", newArticle.title);
    console.log("Current saved articles:", updatedArticles);
  } else {
    console.log("Article already saved:", newArticle.title);
  }
};

export const deleteArticle = (articleToDelete) => {
  const savedArticles = getSavedArticles();
  const filteredArticles = savedArticles.filter(
    (article) => article.title !== articleToDelete.title
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredArticles));
  window.location.reload();
};

export const isArticleSaved = (article) => {
  const savedArticles = getSavedArticles();
  const isSaved = savedArticles.some(
    (savedArticle) => savedArticle.title === article.title
  );
  return isSaved;
};

export const getSavedArticles = () => {
  const savedArticles = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedArticles ? JSON.parse(savedArticles) : [];
};
