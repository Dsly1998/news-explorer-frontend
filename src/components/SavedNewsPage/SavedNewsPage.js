import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"; // Import the SavedNewsHeader component
import "./SavedNewsPage.css"; // Your styles for the SavedNewsPage
import Footer from "../Footer/Footer";

function SavedNewsPage({ currentUser, handleLogout }) {

  return (
    <div className="saved-news-page">
      <SavedNewsHeader 
      userName={currentUser ? currentUser.name : ""}
      onLogout={handleLogout}
       />
      <Footer/>
    </div>
  );
}

export default SavedNewsPage;
