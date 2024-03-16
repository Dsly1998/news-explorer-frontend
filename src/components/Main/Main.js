import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import PopupMenu from "../PopupMenu/PopupMenu"; // Import PopupMenu
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main({ toggleLogin, isLoggedIn, currentUser, handleLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen);
  };

  return (
    <main className="main">
      <div className="main-wrapper">
        {isMobile ? (
          <MobileHeader
            currentRoute="main"
            onMenuClick={togglePopupMenu} // Attach toggle function
          />
        ) : (
          <Header
            onSignInClick={toggleLogin}
            isLoggedIn={isLoggedIn}
            userName={currentUser ? currentUser.name : ""}
            onLogout={handleLogout}
          />
        )}
        <PopupMenu
          isOpen={isPopupMenuOpen}
          onClose={togglePopupMenu}
          isLoggedIn={isLoggedIn}
          userName={currentUser ? currentUser.name : ""}
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
