import { useEffect } from 'react';

export default function PopupWithForm({ name, isOpen, onClose, children }) {
  // закрытие на оверлей
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
      document.removeEventListener('keydown', closeOnEsc);
    }
  }

  // закрытие на esc
  function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
      onClose();
      document.removeEventListener('keydown', closeOnEsc);
    }
  }

  useEffect(() => {
    isOpen && document.addEventListener('keydown', closeOnEsc);
  }, [isOpen]);

  return (
    <div
      className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}>
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={() => {
            onClose();
            document.removeEventListener('keydown', closeOnEsc);
          }}
        />
        {children}
      </div>
    </div>
  );
}
