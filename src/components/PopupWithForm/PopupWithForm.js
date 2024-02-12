import React from 'react';
// Import styles

function PopupWithForm({ isOpen, onClose, children, title }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <button className="popup__close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
        {/* Include form elements and buttons */}
      </div>
    </div>
  );
}

export default PopupWithForm;
