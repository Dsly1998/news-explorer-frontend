import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsPage from '../NewsPage/NewsPage';
import '../../vendor/Style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App__main-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Main />
              </>
            } />
            <Route path="/news" element={NewsPage} />
          </Routes>
        </div>
        <About />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
