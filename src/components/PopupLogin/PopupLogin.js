import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { loginUser } from '../../utils/ThirdPartyApi'; // Import the loginUser function

const PopupLogin = ({ isOpen, onClose, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await loginUser(email, password);
      console.log('Login successful:', response); // Handle the response appropriately
      onClose(); // Close the modal after successful login
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
        <h1 className="popup__title">Sign in</h1>
        <form className="popup__form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="popup__input"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <form className="popup__buttons">
          <button className="popup__submit" type="submit">
            Sign in
          </button>
          {error && <p className="popup__error">{error}</p>}
          <button className="popup__switch" type="button" onClick={onSignUpClick}>
            or <span className="popup__span">Sign up</span>
          </button>
        </form>
      </div>
    </PopupWithForm>
  );
};

export default PopupLogin;
