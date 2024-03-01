import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const PopupConfirmation = ({ isOpen, onClose, onSignInClick }) => {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} title="">
      <p className='popup__confirm-text'>Registration successfully completed!</p>
      <button className='popup__confirm-button' onClick={onSignInClick}>Sign in</button>
    </PopupWithForm>
  );
};


export default PopupConfirmation;
