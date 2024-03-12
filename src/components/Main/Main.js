import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader'; // Make sure the path is correct
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import Footer from '../Footer/Footer';
import './Main.css';

function Main({ toggleLogin, isLoggedIn, currentUser, handleLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className='main'>
      <div className='main-wrapper'>
        {isMobile ? (
          <MobileHeader currentRoute="main" />
        ) : (
          <Header
            onSignInClick={toggleLogin}
            isLoggedIn={isLoggedIn}
            userName={currentUser ? currentUser.name : ''}
            onLogout={handleLogout}
          />
        )}
        <h1 className='main__title'>What's going on in the world?</h1>
        <p className='main__subtitle'>
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
