import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsPage from '../NewsPage/NewsPage';
import '../../vendor/Style.css';

// Import other necessary components

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Main />
              <About />
            </>
          } />
          <Route path="/news" element={<NewsPage />} /> {/* Custom route for news */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
