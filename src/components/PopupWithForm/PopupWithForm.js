import React, { useEffect } from "react";
import Close from "../../images/close.svg"
import "./PopupWithForm.css";

const PopupWithForm = ({ isOpen, onClose, children }) => {
  // Handle the Escape key press for closing the modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Add event listener for keydown
    document.addEventListener("keydown", handleEscKey);

    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]); // Add onClose to the dependency array

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle click on the overlay to close the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content">
        <button className="popup__close" onClick={onClose}>
          <img className="popup__close-icon" alt="close button" src={Close}/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupWithForm;
