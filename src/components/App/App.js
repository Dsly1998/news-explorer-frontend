import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import PopupSignUp from '../PopupSignUp/PopupSignUp';
import NewsPage from '../NewsPage/NewsPage';
import PopupLogin from '../PopupLogin/PopupLogin'; // Import the PopupLogin component
import '../../vendor/Style.css';

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
  

  return (
    <Router>
      <div className="App">
        <div className="App__main-wrapper">
          <Header onSignInClick={toggleLogin} />
          <Routes>
            <Route path="/" element={<><Main /></>} />
            {/* <Route path="/news" element={<NewsPage />} /> */}
          </Routes>
        </div>
        <About />
        <Footer />
      </div>

      <PopupLogin 
          isOpen={isLoginOpen} 
          onClose={toggleLogin} 
          onSignUpClick={handleSignUpClick} // Add this to PopupLogin
        />
       <PopupSignUp 
  isOpen={isSignUpOpen} 
  onClose={toggleSignUp} 
  onSignInClick={handleSignInClick} // Ensure you define handleSignInClick
/>

    </Router>
  );
}

export default App