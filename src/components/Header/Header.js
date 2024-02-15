import React from "react";
import "./Header.css"; // Assuming you have a CSS file for styling

function Header({ isLoggedIn, userName, onSignInClick }) {
  return (
    <header className="header">
      <button className="header__button header__button--news-explorer">
        NewsExplorer
      </button>
      <div className="header__right-buttons">
        {isLoggedIn ? (
          <>
            <button className="header__button">Saved Articles</button>
            <button className="header__button">
              {userName}
              {/* Small icon next to the user's name */}
              <span className="header__user-icon"></span>
            </button>
          </>
        ) : (
          <>
            <button className="header__button header__button-home">Home</button>
            <button className="header__button header__button-signin" onClick={onSignInClick}>Sign in</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
