import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { registerUser } from "../../utils/auth"; // Adjust this path

const PopupSignUp = ({ isOpen, onClose, onSignInClick, onConfirmation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isEmailValid || !email ? "" : "Invalid email address");

    const isPasswordValid = password.length >= 6; // Example validation, adjust as needed
    setPasswordError(
      isPasswordValid || !password
        ? ""
        : "Password must be at least 6 characters"
    );

    const isNameValid = name.length >= 2; // Example validation, adjust as needed
    setNameError(
      isNameValid || !name ? "" : "Username must be at least 2 characters"
    );

    setIsFormValid(isEmailValid && isPasswordValid && isNameValid);
  }, [email, password, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please fill out all fields correctly.");
      return;
    }

    try {
      const user = await registerUser({ email, password, name });
      onConfirmation(); // Call the confirmation handler after successful registration
      onClose(); // Close the popup on successful registration
      setError(null); // Clear any existing errors
    } catch (error) {
      setError(
        error.message || "Registration failed due to network or server error."
      );
      // The modal stays open, and no confirmation is called
    }
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
          {emailError && <p className="popup__error">{emailError}</p>}
          <label className="popup__label-password">Password</label>
          <input
            className="popup__input"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="popup__error">{passwordError}</p>}
          <label className="popup__label-username">Username</label>
          <input
            className="popup__input"
            type="text"
            placeholder="Enter your username"
            required
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
          {nameError && <p className="popup__error">{nameError}</p>}
          {error && <p className="popup__error-submit">{error}</p>}
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
