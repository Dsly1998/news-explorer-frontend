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
import { getUserProfile } from "../../utils/auth";
import { getArticlesByUser } from "../../utils/api";
import "./App.css";
import "../../vendor/Style.css";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [setError] = useState(null);

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
    setIsLoggedIn(false);
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setSavedArticles([]);
  };

  const fetchUserProfile = async (token) => {
    try {
      const userProfile = await getUserProfile(token);
      setCurrentUser(userProfile); // Set user profile in state
    } catch (error) {
      setError(`Error fetching user profile: ${error.message}`);
    }
  };

  const fetchSavedArticles = async (userToken) => {
    try {
      const articles = await getArticlesByUser(userToken);
      setSavedArticles(articles);
    } catch (error) {
      setError(`Error fetching articles: ${error.message}`);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchUserProfile(storedToken);
      fetchSavedArticles(storedToken);
    }
  }, []);

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
        <Routes>
          <Route
            path="/"
            element={
              <Main
                toggleLogin={toggleLogin}
                isLoggedIn={isLoggedIn}
                onSignInClick={handleSignInClick}
                currentUser={currentUser}
                handleLogout={handleLogout}
                token={token}
                setSavedArticles={setSavedArticles}
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
                  token={token}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <PopupLogin
          isOpen={isLoginOpen}
          onClose={toggleLogin}
          onSignUpClick={handleSignUpClick}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          fetchUserProfile={fetchUserProfile}
          setError={setError}
          fetchSavedArticles={fetchSavedArticles}
        />
        <PopupSignUp
          isOpen={isSignUpOpen}
          onClose={toggleSignUp}
          onSignInClick={handleSignInClick}
          onConfirmation={toggleConfirmation}
          setError={setError}
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
