import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PopupSignUp from "../PopupSignUp/PopupSignUp";
import NewsPage from "../NewsPage/NewsPage";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import PopupLogin from "../PopupLogin/PopupLogin";
import "../../vendor/Style.css";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const toggleSignUp = () => setSignUpOpen(!isSignUpOpen);

  const handleSignUpClick = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleSignInClick = () => {
    setSignUpOpen(false);
    setLoginOpen(true);
  };

  const savedArticles = [
    // Array of article objects
  ];

  const [isLoggedIn] = useState(true);

  return (
    <Router>
      <div className="App">
        <div className="App__main-wrapper">
          <Header
            onSignInClick={toggleLogin}
            isLoggedIn={isLoggedIn}
            userName={"Dallin"}
          />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved-news" element={<SavedNewsPage userName="Elise" savedArticles={savedArticles} />} />
            {/* Add this line */}
            {/* Uncomment and use the NewsPage route if needed */}
            {/* <Route path="/news" element={<NewsPage />} /> */}
          </Routes>
        </div>
        <About />
        <Footer />
      </div>

      <PopupLogin
        isOpen={isLoginOpen}
        onClose={toggleLogin}
        onSignUpClick={handleSignUpClick}
      />
      <PopupSignUp
        isOpen={isSignUpOpen}
        onClose={toggleSignUp}
        onSignInClick={handleSignInClick}
      />
    </Router>
  );
}

export default App;
