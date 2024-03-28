import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { loginUser } from "../../utils/auth";

const PopupLogin = ({
  isOpen,
  onClose,
  onSignUpClick,
  setIsLoggedIn,
  setToken,
  fetchUserProfile,
  setError,
  fetchSavedArticles,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isEmailValid || !email ? "" : "Invalid email address");
    setIsFormValid(isEmailValid && email && password);
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    try {
      const response = await loginUser({ email, password });
      setIsLoggedIn(true);
      setToken(response.token);
      localStorage.setItem("token", response.token); // Store the token
      fetchUserProfile(response.token);
      onClose();
      fetchSavedArticles(response.token);
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
        <h1 className="popup__title-login">Sign in</h1>
        <form className="popup__form" id="login" onSubmit={handleSubmit}>
          <label className="popup__label-email">Email</label>
          <input
            className="popup__input popup__input-email"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {submitError && <p className="popup__error-login">{submitError}</p>}
          {emailError && <p className="popup__error-login">{emailError}</p>}
          <label className="popup__label-password">Password</label>
          <input
            className="popup__input popup__input-password"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`popup__submit ${
              !isFormValid ? "popup__submit-disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Sign in
          </button>
        </form>
        <button className="popup__switch" type="button" onClick={onSignUpClick}>
          or <span className="popup__span">Sign up</span>
        </button>
      </div>
    </PopupWithForm>
  );
};

export default PopupLogin;
