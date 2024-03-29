const LOCAL_STORAGE_KEY = "savedArticles";

export const saveArticle = (newArticle) => {
  const savedArticles = getSavedArticles();
  const articleExists = savedArticles.some(
    (article) => article.title === newArticle.title
  );

  if (!articleExists) {
    const updatedArticles = [...savedArticles, newArticle];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedArticles));
  }
};

export const deleteArticle = (articleToDelete) => {
  const savedArticles = getSavedArticles();
  const filteredArticles = savedArticles.filter(
    (article) => article.title !== articleToDelete.title
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredArticles));
};

export const isArticleSaved = (article) => {
  const savedArticles = getSavedArticles();
  return savedArticles.some((savedArticle) => savedArticle.title === article.title);
};

export const getSavedArticles = () => {
  const savedArticles = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedArticles ? JSON.parse(savedArticles) : [];
};
