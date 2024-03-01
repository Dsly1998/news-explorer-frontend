import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupSignUp = ({ isOpen, onClose, onSignInClick, onConfirmation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !username) {
      setError("All fields are required");
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
        <h1 className="popup__title">Sign up</h1>
        <form className="popup__form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="popup__input"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </form>
        <form className="popup__form">
          <label>Password</label>
          <input
            className="popup__input"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </form>
        <form className="popup__form">
          <label>Username</label>
          <input
            className="popup__input"
            type="text"
            placeholder="Enter your username"
            required
            value={username}
            onChange={handleUsernameChange}
          />
        </form>
        <form className="popup__buttons" onSubmit={handleSubmit}>
          <button className="popup__submit" type="submit">
            Sign up
          </button>
          {error && <p className="popup__error">{error}</p>}
          <button
            className="popup__switch"
            type="button"
            onClick={onSignInClick}
          >
            or <span className="popup__span">Sign in</span>
          </button>
        </form>
      </div>
    </PopupWithForm>
  );
};

export default PopupSignUp;
