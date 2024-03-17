import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Main from "../Main/Main";
import PopupSignUp from "../PopupSignUp/PopupSignUp";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupConfirmation from "../PopupConfirmation/PopupConfirmation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";
import "../../vendor/Style.css";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem("isLoggedIn") === "true";
    } catch (error) {
      console.error("Error reading isLoggedIn:", error);
      return false;
    }
  });
  const [currentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
      console.error("Error reading currentUser:", error);
      return null;
    }
  });
  const [savedArticles] = useState([]);
  const [error, setError] = useState(null);

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
    try {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
    } catch (error) {
      setError(`Logout Error: ${error.message}`);
      console.error(`Logout Error: ${error.message}`);
    }
    setIsLoggedIn(false);
  };

  function RedirectToHomeOnLogout() {
    let navigate = useNavigate();
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [navigate]);

    return null;
  }

  return (
    <Router>
      <RedirectToHomeOnLogout />
      <div className="app">
        {error && <p className="app__error">{error}</p>}
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
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  handleLogout={handleLogout}
                />
              </ProtectedRoute>
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