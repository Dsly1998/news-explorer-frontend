import React from 'react';
import './ModalWithForm.css'; // Import your CSS styles

function ModalWithForm({ isOpen, onClose, children, title }) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        {children}
        <button className="modal__close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default ModalWithForm;
