import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateSavedArticles = () => {
    navigate("/saved-news");
  };

  return { navigateHome, navigateSavedArticles };
};

export default useNavigation;
