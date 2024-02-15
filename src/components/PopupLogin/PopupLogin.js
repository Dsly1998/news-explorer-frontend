import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupLogin = ({ isOpen, onClose, onSignUpClick }) => {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
      <h1 className="popup__title">Sign in</h1>
      <form className="popup__form">
        Email
        <input
          className="popup__input"
          type="email"
          placeholder="Enter email"
          required
        />
      </form>
      <form className="popup__form">
        Password
        <input
          className="popup__input"
          type="password"
          placeholder="Enter password"
          required
        />
      </form>
      <form className="popup__buttons">
        <button className="popup__submit" type="submit">
          Sign in
        </button>
        <button className="popup__switch" type="button" onClick={onSignUpClick}>
          or <span className="popup__span">Sign up</span>
        </button>
      </form>
      </div>
    </PopupWithForm>
  );
};

export default PopupLogin;
