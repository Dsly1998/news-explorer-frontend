import React from "react";
import useNavigation from "../Navigation/Navigation";
import "./Header.css";
import logoutIcon from "../../images/logout.svg";

function Header({ isLoggedIn, userName, onSignInClick, onLogout }) {
  const { navigateHome, navigateSavedArticles } = useNavigation();

  // Error-safe navigation functions
  const safeNavigateHome = () => {
    try {
      navigateHome();
    } catch (error) {
      console.error("Navigation error:", error);
      // Additional error handling (e.g., displaying a message to the user) can go here
    }
  };

  const safeNavigateSavedArticles = () => {
    try {
      navigateSavedArticles();
    } catch (error) {
      console.error("Navigation error:", error);
      // Additional error handling here
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <button
          className="header__button header__button--news-explorer"
          onClick={safeNavigateHome}
        >
          NewsExplorer
        </button>

        {isLoggedIn ? (
          <div className="header__login-right">
            <button
              className="header__button header__button-home"
              onClick={safeNavigateHome}
            >
              Home
            </button>
            <button
              className="header__button header__button-articles"
              onClick={safeNavigateSavedArticles}
            >
              Saved articles
            </button>
            <button
              className="header__button header__button-name"
              onClick={onLogout}
            >
              {userName}
              <img
                className="header__logout-icon"
                src={logoutIcon}
                alt="logout icon"
              />
            </button>
          </div>
        ) : (
          <div className="header__right-buttons">
            <button
              className="header__button header__button-home"
              onClick={safeNavigateHome}
            >
              Home
            </button>
            <button
              className="header__button header__button-signin"
              onClick={onSignInClick}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
