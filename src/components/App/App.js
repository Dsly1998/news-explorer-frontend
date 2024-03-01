import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PopupSignUp from "../PopupSignUp/PopupSignUp";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupConfirmation from "../PopupConfirmation/PopupConfirmation";
import "./App.css";
import "../../vendor/Style.css";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser'))
  );
  const toggleLogin = () => setLoginOpen(!isLoginOpen);
  const toggleSignUp = () => setSignUpOpen(!isSignUpOpen);

  const handleSignUpClick = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleSignInClick = () => {
    setConfirmationOpen(false);
    setSignUpOpen(false);
    setLoginOpen(true);
  };
  

  const toggleConfirmation = () => setConfirmationOpen(!isConfirmationOpen);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    // navigate to home or login page as needed
  };  

  return (
    <Router>
      <div className="App">
        <div className="App__main-wrapper">
          <Header
            onSignInClick={toggleLogin}
            isLoggedIn={isLoggedIn}
            userName={currentUser ? currentUser.name : ""}
            onLogout={handleLogout}
          />
          <Routes>
            <Route path="/" element={<Main />} />
            {/* ... other routes ... */}
          </Routes>
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
        onSignInClick={handleSignInClick}
        onConfirmation={toggleConfirmation} // New prop
      />
      <PopupConfirmation
        isOpen={isConfirmationOpen}
        onClose={toggleConfirmation}
        onSignInClick={handleSignInClick}
      />
    </Router>
  );
}

export default App;
