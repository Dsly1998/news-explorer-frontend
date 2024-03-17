import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import PopupMenu from "../PopupMenu/PopupMenu";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";

function Main({ toggleLogin, isLoggedIn, currentUser, handleLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  console.log("Initial isMobile:", isMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleResize = (e) => {
      console.log("Window resized, isMobile:", e.matches);
      setIsMobile(e.matches);
    };

    // Call the function immediately to set the initial state
    handleResize(mediaQuery);

    // Add event listener
    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen);
  };

  return (
    <main className="main">
      <div className="main-wrapper">
        {isMobile ? (
          <>
            <MobileHeader currentRoute="main" onMenuClick={togglePopupMenu} />
            {console.log("Rendering MobileHeader")}
          </>
        ) : (
          <>
            <Header
              onSignInClick={toggleLogin}
              isLoggedIn={isLoggedIn}
              userName={currentUser ? currentUser.name : ""}
              onLogout={handleLogout}
            />
            {console.log("Rendering Header")}
          </>
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
