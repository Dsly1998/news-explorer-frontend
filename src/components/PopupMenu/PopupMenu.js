import React from "react";
import useNavigation from "../Navigation/Navigation";
import closeIcon from "../../images/close.svg"; // Make sure the path is correct
import logoutIcon from "../../images/logout.svg"; // Make sure the path is correct
import "./PopupMenu.css";

function PopupMenu({
  isOpen,
  onClose,
  isLoggedIn,
  name,
  onSignInClick,
  onLogout,
}) {
  const { navigateHome, navigateSavedArticles } = useNavigation();

  const handleSignInAndClose = () => {
    onSignInClick();
    onClose();
  };

  return (
    <div
      className={`popup-menu--close ${isOpen ? "popup-menu" : ""}`}
      onClick={onClose}
    >
      <div className="popup-menu__background">
        <div className="popup-menu__header">
          <h1 className="popup-menu__text">NewsExplorer</h1>
          <button className="popup-menu__close-button" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <div
          className="popup-menu__content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="popup-menu__item popup-menu__item--home"
            onClick={navigateHome}
          >
            Home
          </button>
          {isLoggedIn ? (
            <>
              <button
                className="popup-menu__item popup-menu__item--articles"
                onClick={navigateSavedArticles}
              >
                Saved Articles
              </button>
              <div
                className="popup-menu__item-submit popup-menu__user-info"
                onClick={onLogout}
              >
                <div className="popup-menu__button-content">
                  {name}
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    className="popup-menu__logout-icon"
                  />
                </div>
              </div>
            </>
          ) : (
            <button
              className="popup-menu__item-submit"
              onClick={handleSignInAndClose}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupMenu;
