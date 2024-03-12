import React from "react";
import useNavigation from "../Navigation/Navigation";
import menu from "../../images/menu.svg";
import menuBlack from "../../images/menu-black.svg";
import "./MobileHeader.css";

function MobileHeader({ currentRoute }) {
  const { navigateHome } = useNavigation();

  const isSavedNewsRoute = currentRoute === 'saved-news';
  const menuIcon = isSavedNewsRoute ? menuBlack : menu; // Determine which icon to use

  return (
    <header className={`mobile-header ${isSavedNewsRoute ? 'mobile-header--saved-news' : ''}`}>
      <div className={`mobile-header__container ${isSavedNewsRoute ? 'mobile-header__container--saved-news' : ''}`}>
        <button
          className={`mobile-header__button mobile-header__button--news-explorer ${isSavedNewsRoute ? 'mobile-header__button--news-explorer-saved-news' : ''}`}
          onClick={navigateHome}
        >
          NewsExplorer
        </button>
        <button className="mobile-header__menu-button">
          <img className="mobile-header__menu-icon" alt="Menu Icon" src={menuIcon} />
        </button>
      </div>
    </header>
  );
}

export default MobileHeader;
