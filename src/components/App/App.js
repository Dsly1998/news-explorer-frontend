import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import fetchNews from "../../utils/NewsApi";
import Footer from "../Footer/Footer";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PopupSignUp from "../PopupSignUp/PopupSignUp";
import PopupLogin from "../PopupLogin/PopupLogin";
import "./App.css";
import "../../vendor/Style.css";
import NotFound from "../NotFound/NotFound";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [currentUser, setCurrentUser] = useState(null);
  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const toggleSignUp = () => setSignUpOpen(!isSignUpOpen);
  const [articles, setArticles] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSignUpClick = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleSignInClick = () => {
    setSignUpOpen(false);
    setLoginOpen(true);
  };

  // const handleLogin = async (email, password) => {
  //   try {
  //     const response = await loginUser(email, password);
  //     // Handle response, store token, set user info, etc.
  //     setIsLoggedIn(true);
  //     setCurrentUser(response.user); // Assuming the response contains user info
  //     setLoginOpen(false); // Close the login modal
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     // Handle login failure (show error message, etc.)
  //   }
  // };

  // const handleSignUp = async (email, password, username) => {
  //   try {
  //     const response = await registerUser(email, password, username);
  //     // Handle successful sign-up here
  //     // You might want to log the user in directly or show a confirmation
  //     setSignUpOpen(false); // Close the sign-up modal
  //   } catch (error) {
  //     console.error("Sign-up failed:", error);
  //     // Handle sign-up failure
  //   }
  // };

  // const handleLogout = () => {
  //   // Clear user state, invalidate token, etc.
  //   setIsLoggedIn(false);
  //   setCurrentUser(null);
  // };

  const handleSearch = async () => {
    setSearchPerformed(true);
    try {
      const fetchedArticles = await fetchNews(searchTerm);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Optionally set error state here if needed
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="App__main-wrapper">
          <Header
            onSignInClick={toggleLogin}
            isLoggedIn={isLoggedIn}
            userName={currentUser ? currentUser.name : ""}
            // onLogout={handleLogout}
          />
          <Routes>
          <Route path="/" element={<Main handleSearch={handleSearch} setSearchTerm={setSearchTerm} />} />
            {/* ... other routes ... */}
          </Routes>

          {searchPerformed && (
            articles.length > 0 ? <NewsCardList articles={articles} /> : <NotFound />
          )}

          <About />
          <Footer />
        </div>
      </div>

      <PopupLogin
        isOpen={isLoginOpen}
        onClose={toggleLogin}
        // onLogin={handleLogin}
        onSignUpClick={handleSignUpClick}
      />
      <PopupSignUp
        isOpen={isSignUpOpen}
        onClose={toggleSignUp}
        // onSignUp={handleSignUp}
        onSignInClick={handleSignInClick}
      />
    </Router>
  );
}

export default App;