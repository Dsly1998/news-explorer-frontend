// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupSignUp from "../PopupSignUp/PopupSignUp";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupConfirmation from "../PopupConfirmation/PopupConfirmation";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoginOpen={isLoginOpen}
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
              <SavedNewsPage
                currentUser={currentUser}
                handleLogout={handleLogout}
                savedArticles={savedArticles}
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
