import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import PopupSignUp from "../PopupSignUp/PopupSignUp";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupConfirmation from "../PopupConfirmation/PopupConfirmation";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";
import "../../vendor/Style.css";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [savedArticles, setSavedArticles] = useState([]);

  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const toggleSignUp = () => setSignUpOpen(!isSignUpOpen);
  const toggleConfirmation = () => setConfirmationOpen(!isConfirmationOpen);

  const handleSignUpClick = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleSignInClick = () => {
    setConfirmationOpen(false);
    setSignUpOpen(false);
    setLoginOpen(true);
  };

  // Simplified logout logic using local storage
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  function RedirectToHomeOnLogout() {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [isLoggedIn, navigate]);

    return null; // This component does not render anything
  }

  return (
    <Router>
      <RedirectToHomeOnLogout />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                toggleLogin={toggleLogin}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                currentUser={currentUser}
                savedArticles={savedArticles}
                handleLogout={handleLogout}
              />
            }
          />
        </Routes>
        <PopupLogin
          isOpen={isLoginOpen}
          onClose={toggleLogin}
          onSignUpClick={handleSignUpClick}
        />
        <PopupSignUp
          isOpen={isSignUpOpen}
          onClose={toggleSignUp}
          onSignInClick={handleSignInClick}
          onConfirmation={toggleConfirmation}
        />
        <PopupConfirmation
          isOpen={isConfirmationOpen}
          onClose={toggleConfirmation}
          onSignInClick={handleSignInClick}
        />
      </div>
    </Router>
  );
}

export default App;
