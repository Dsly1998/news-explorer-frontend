import React from 'react';
import PopupWithForm from './PopupWithForm';

const PopupConfirmation = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} title="">
      <p>Registration successfully completed!</p>
      {/* <button onClick={}>Sign in</button> */}
    </PopupWithForm>
  );
};

export default PopupConfirmation;
