import { useEffect } from "react";
import success from "../images/success.svg";
import failure from "../images/failure.svg";

export default function InfoTooltip({ isOpen, onClose, error }) {
  // закрытие на оверлей
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
      document.removeEventListener("keydown", closeOnEsc);
    }
  }

  // закрытие на esc
  function closeOnEsc(evt) {
    if (evt.key === "Escape") {
      onClose();
      document.removeEventListener("keydown", closeOnEsc);
    }
  }

  useEffect(() => {
    isOpen && document.addEventListener("keydown", closeOnEsc);
  }, [isOpen]);

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container popup__container-registration">
        <button
          className="popup__close"
          onClick={() => {
            onClose();
            document.removeEventListener("keydown", closeOnEsc);
          }}
        />
        <img
          className="popup__registration-image"
          src={error ? failure : success}
          alt={
            error
              ? "Что-то пошло не так! Попробуйте ещё раз."
              : "Вы успешно зарегистрировались!"
          }
        />
        <h2 className="popup__registration-text">
          {error
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
      </div>
    </div>
  );
}
