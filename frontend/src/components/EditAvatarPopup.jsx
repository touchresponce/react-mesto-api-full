import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonName,
  title,
  isLoading,
}) {
  const avatarInput = useRef('');
  const form = useRef('');

  const { handleChange, errors, isValid, forceValidationChange } = useFormValidation();

  function handleLinkInput(evt) {
    handleChange(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
    forceValidationChange();
  }

  useEffect(() => {
    isOpen && form.current.reset();
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <form className="form avatar-form" name="avatar-form" onSubmit={handleSubmit} ref={form}>
        <h2 className="popup__title">{title}</h2>
        <input
          className={`popup__input popup__input_type_avatar ${
            errors.avatar ? 'popup__input_type_error' : ''
          }`}
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка"
          required
          autoComplete="off"
          ref={avatarInput}
          onChange={handleLinkInput}
        />
        <span
          className={`popup__input-error avatar-input-error ${
            !isValid ? 'popup__input-error_active' : ''
          }`}>
          {errors.avatar}
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
