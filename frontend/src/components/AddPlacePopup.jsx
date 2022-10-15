import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';
import { useEffect, useRef } from 'react';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  buttonName,
  title,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, forceValidationChange } = useFormValidation();
  const form = useRef('');

  function handleNameInput(evt) {
    handleChange(evt);
  }

  function handleLinkInput(evt) {
    handleChange(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
    forceValidationChange();
  }

  useEffect(() => {
    isOpen && form.current.reset();
  }, [isOpen]);

  return (
    <PopupWithForm name="add" isOpen={isOpen} onClose={onClose}>
      <form className="form add-form" name="add-form" onSubmit={handleSubmit} ref={form}>
        <h2 className="popup__title">{title}</h2>
        <input
          className="popup__input popup__input_place_name"
          type="text"
          name="name"
          id="placeName-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
          onChange={handleNameInput}
        />
        <span
          className={`popup__input-error placeName-input-error ${
            !isValid ? 'popup__input-error_active' : ''
          }`}>
          {errors.name}
        </span>
        <input
          className="popup__input popup__input_place_url"
          type="url"
          name="link"
          id="placeUrl-input"
          placeholder="Ссылка на картинку"
          required
          autoComplete="on"
          onChange={handleLinkInput}
        />
        <span
          className={`popup__input-error placeUrl-input-error ${
            !isValid ? 'popup__input-error_active' : ''
          }`}>
          {errors.link}
        </span>
        <button
          className={`popup__submit ${isValid ? '' : 'popup__submit_disabled'}`}
          type="submit"
          disabled={!isValid}>
          {isLoading ? 'Сохранение...' : buttonName}
        </button>
      </form>
    </PopupWithForm>
  );
}
