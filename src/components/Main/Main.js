import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import PopupMenu from "../PopupMenu/PopupMenu";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main({ toggleLogin, isLoggedIn, currentUser, handleLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen);
  };

  return (
    <main className="main">
      <div className="main__wrapper">
        {isMobile ? (
          <>
            <MobileHeader currentRoute="main" onMenuClick={togglePopupMenu} />
          </>
        ) : (
          <>
            <Header
              onSignInClick={toggleLogin}
              isLoggedIn={isLoggedIn}
              name={currentUser ? currentUser.name : ""}
              onLogout={handleLogout}
            />
          </>
        )}
        <PopupMenu
          isOpen={isPopupMenuOpen}
          onClose={togglePopupMenu}
          isLoggedIn={isLoggedIn}
          name={currentUser ? currentUser.name : ""}
          onLogout={handleLogout}
          onSignInClick={toggleLogin}
        />
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm isLoggedIn={isLoggedIn} />
        <About />
        <Footer />
      </div>
    </main>
  );
}

export default Main;
