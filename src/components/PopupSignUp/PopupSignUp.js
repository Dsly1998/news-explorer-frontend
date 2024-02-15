import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const PopupSignUp = ({ isOpen, onClose, onSignInClick }) => {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
        <h1 className="popup__title">Sign up</h1>
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
        <form className="popup__form">
          Username
          <input
            className="popup__input"
            type="text"
            placeholder="Enter your username"
            required
          />
        </form>
        <form className="popup__buttons">
          <button className="popup__submit" type="submit">
            Sign up
          </button>
          <button className="popup__switch" type="button" onClick={onSignInClick}>
            or <span className="popup__span">Sign in</span>
          </button>
        </form>
      </div>
    </PopupWithForm>
  );
};

export default PopupSignUp;
