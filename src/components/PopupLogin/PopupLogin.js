import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const PopupLogin = ({ isOpen, onClose, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData && userData.email === email && userData.password === password) {
      // Credentials match, set login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ email, name: userData.username }));
      onClose(); // Close the login modal
      window.location.reload(); // Refresh the page to update state
    } else {
      // Credentials do not match, set error
      setError('Invalid email or password');
    }
  };
  

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
        <h1 className="popup__title">Sign in</h1>
        <form className="popup__form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="popup__input popup__input-email"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="popup__input popup__input-password"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="popup__submit" type="submit">
            Sign in
          </button>
          {error && <p className="popup__error">{error}</p>}
        </form>
        <button className="popup__switch" type="button" onClick={onSignUpClick}>
          or <span className="popup__span">Sign up</span>
        </button>
      </div>
    </PopupWithForm>
  );
};

export default PopupLogin;