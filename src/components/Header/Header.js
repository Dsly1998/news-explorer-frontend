import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Header.css";
import logout from "../../images/logout.svg";

function Header({ isLoggedIn, userName, onSignInClick }) {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation to the Home page
  const navigateHome = () => {
    navigate("/");
  };

  // Function to handle navigation to the Saved Articles page
  const navigateSavedArticles = () => {
    navigate("/saved-news");
  };

  return (
    <header className="header">
      <button
        className="header__button header__button--news-explorer"
        onClick={navigateHome}
      >
        NewsExplorer
      </button>

      {isLoggedIn ? (
        <>
          <div className="header__login-right">
            <button
              className="header__button header__button-home"
              onClick={navigateHome}
            >
              Home
            </button>
            <button
              className="header__button header__button-articles"
              onClick={navigateSavedArticles}
            >
              Saved Articles
            </button>
            <button className="header__button header__button-name">
              {userName}
              <img
                className="header__logout-icon"
                src={logout}
                alt="logout icon"
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="header__right-buttons">
            <button
              className="header__button header__button-home"
              onClick={navigateHome}
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
        </>
      )}
    </header>
  );
}

export default Header;
