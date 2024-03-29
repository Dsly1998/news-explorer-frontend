import React from "react";
import useNavigation from "../Navigation/Navigation"; // Adjust the path as necessary
import logoutBlack from "../../images/logoutblack.svg";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ userName, onLogout }) {
  const { navigateHome, navigateSavedArticles } = useNavigation();

  return (
    <header className="saved-header">
      <button
        className="saved-header__button saved-header__button--news-explorer"
        onClick={navigateHome}
      >
        NewsExplorer
      </button>

      <div className="saved-header__login-right">
        <button
          className="saved-header__button saved-header__button-home"
          onClick={navigateHome}
        >
          Home
        </button>
        <button
          className="saved-header__button saved-header__button-articles"
          onClick={navigateSavedArticles}
        >
          Saved Articles
        </button>
        <button
          className="saved-header__button saved-header__button-name"
          onClick={onLogout}
        >
          {userName}
          <img
            className="saved-header__logout-icon"
            src={logoutBlack}
            alt="logout icon"
          />
        </button>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
