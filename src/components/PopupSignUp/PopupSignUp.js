import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupSignUp = ({ isOpen, onClose, onSignInClick, onConfirmation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Update the form validity whenever there's a change in the fields
  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const areFieldsFilled = email && password && username;
    const isDuplicateEmail = localStorage.getItem(email) !== null;

    setIsFormValid(isEmailValid && areFieldsFilled && !isDuplicateEmail);
  }, [email, password, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please fill out all fields correctly.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password, username }));
    localStorage.setItem("isLoggedIn", "false"); // Set initial login status to false
    onClose();
    onConfirmation();
  };

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
        <h2 className="popup__title">Sign up</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <label className="popup__label-email">Email</label>
          <input
            className="popup__input"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="popup__label-password" >Password</label>
          <input
            className="popup__input"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="popup__label-username">Username</label>
          <input
            className="popup__input"
            type="text"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error && <p className="popup__error">{error}</p>}
          <button
            className={`popup__submit ${
              !isFormValid ? "popup__submit-disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Sign up
          </button>
        </form>
        <button className="popup__switch" type="button" onClick={onSignInClick}>
          or <span className="popup__span">Sign in</span>
        </button>
      </div>
    </PopupWithForm>
  );
};

export default PopupSignUp;
