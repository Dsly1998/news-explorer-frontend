import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoutIcon from "../../images/logout.svg";

function Header({ isLoggedIn, userName, onSignInClick, onLogout }) {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateSavedArticles = () => {
    navigate("/saved-news");
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate("/"); // Optionally navigate to a different page after logout
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
        <div className="header__login-right">
          <button className="header__button header__button-home" onClick={navigateHome}>
            Home
          </button>
          <button className="header__button header__button-articles" onClick={navigateSavedArticles}>
            Saved Articles
          </button>
          <button className="header__button header__button-name" onClick={onLogout}>
            {userName}
            <img
              className="header__logout-icon"
              src={logoutIcon}
              alt="logout icon"
              onClick={handleLogout} // Add logout functionality to the logout icon
            />
          </button>
        </div>
      ) : (
        <div className="header__right-buttons">
          <button className="header__button header__button-home" onClick={navigateHome}>
            Home
          </button>
          <button className="header__button header__button-signin" onClick={onSignInClick}>
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
