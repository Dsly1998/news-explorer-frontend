// Main.js

import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main({
  toggleLogin,
  isLoggedIn,
  currentUser,
  handleLogout
}) {
  return (
    <main className="main">
      <div className="main-wrapper">
        <Header
          onSignInClick={toggleLogin}
          isLoggedIn={isLoggedIn}
          userName={currentUser ? currentUser.name : ""}
          onLogout={handleLogout}
        />
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
        <About />
        <Footer />
      </div>
    </main>
  );
}

export default Main;
